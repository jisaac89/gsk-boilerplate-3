let global: any;

import * as superagentPromise from 'superagent-promise';
import * as _superagent from 'superagent';
import { appStore } from '../stores/AppStore';
import { authStore } from '../stores/AuthStore';

import { tokenPlugin, handleErrors, responseBody } from '../utils/RequestHelpers';

const superagent = superagentPromise(_superagent, Promise);

const API_HISTORY = 'http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/system/historian';
const API_ROOT = 'http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/cloud.aperio.viiv.';

const encode = encodeURIComponent;

export const hyperledger_requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      // .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .set('Content-Type', 'application/json')
      // .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  getHistory: () =>
    superagent
      .get(`${API_HISTORY}`)
      .set('Content-Type', 'application/json')
      // .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .set('Content-Type', 'application/json')
      // .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .set('Content-Type', 'application/json')
      .withCredentials()
      // .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};