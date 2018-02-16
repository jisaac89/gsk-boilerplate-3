import { authStore, appStore, notificationStore } from '../stores/_GlobalStore';

import * as superagentPromise from 'superagent-promise';
import * as _superagent from 'superagent';

const superagent = superagentPromise(_superagent, Promise);

export const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        // handle Server errors here - maybe use notification component
        // authStore.signout();
    }
    return err;
};

export const responseBody = res => res.body;

export const tokenPlugin = req => {
    if (appStore.token) {
        req.set('authorization', `Token ${appStore.token}`);
    }
};

function* pollForUrl(root, url: string) {
    while (true) {
        yield fetch(`${root}${url}`, {
            method: 'get'
        }).then(function (d) {
            var json = d.json();
            return json;
        });
    }
}

export const requestHelper = (root) => {
    return {
        del: url =>
            superagent
                .del(`${root}${url}`)
                .use(tokenPlugin)
                .end(handleErrors)
                .then(responseBody),
        get: url =>
            superagent
                .get(`${root}${url}`)
                .set('Content-Type', 'application/json')
                .use(tokenPlugin)
                .end(handleErrors)
                .then(responseBody),
        put: (url, body) =>
            superagent
                .put(`${root}${url}`, body)
                .set('Content-Type', 'application/json')
                .use(tokenPlugin)
                .end(handleErrors)
                .then(responseBody),
        post: (url, body) =>
            superagent
                .post(`${root}${url}`, body)
                .set('Content-Type', 'application/json')
                .withCredentials()
                .use(tokenPlugin)
                .end(handleErrors)
                .then(responseBody),
        poll: (url, currentDataSource, cb) => {
            const context = this;
            let currentDataSourceLength = currentDataSource.length || 0;
            function runPolling(generator?: any) {
                if (!generator) {
                    generator = pollForUrl(root, url);
                }
                var p = generator.next();
                p.value.then(function (d) {
                    if (d.length > currentDataSourceLength) {
                        currentDataSourceLength = d.length;
                        runPolling(generator);
                        cb(d);
                    } else {
                        currentDataSourceLength = d.length;
                    }
                });
            }
            runPolling();
        }
    }
};