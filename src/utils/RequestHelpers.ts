import { authStore, appStore } from '../stores/_GlobalStore';

import * as superagentPromise from 'superagent-promise';
import * as _superagent from 'superagent';

const superagent = superagentPromise(_superagent, Promise);

export const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.signout();
    }
    return err;
};

export const responseBody = res => res.body;

export const tokenPlugin = req => {
    if (appStore.token) {
        req.set('authorization', `Token ${appStore.token}`);
    }
};

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
                .then(responseBody)
    }
};