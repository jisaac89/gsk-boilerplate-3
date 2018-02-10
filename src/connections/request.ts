let global : any;

import * as superagentPromise from 'superagent-promise';
import * as _superagent from 'superagent';
import {appStore} from '../stores/AppStore';
import {authStore} from '../stores/AuthStore';

import {tokenPlugin, handleErrors, responseBody} from '../utils/RequestHelpers';

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'http://ec2-35-169-99-210.compute-1.amazonaws.com:5984/';

const encode = encodeURIComponent;

export const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .withCredentials()
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};