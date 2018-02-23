import * as decode from 'jwt-decode';
import { routerStore } from '../stores/RouterStore';
import * as auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'UtSVwHMRSxkrQmb0DuH7wZ6sU8HrnBTK';
const CLIENT_DOMAIN = 'recoil.auth0.com';
const REDIRECT = window.location.origin + '/callback';
const AUDIENCE = 'https://recoil.auth0.com/api/v2/';

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function auth0login() {
  window.location.href = '/login';
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  routerStore.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getCookie('access_token');;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getCookie('id_token');;
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token: any = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function getUserInfo(cb) {
  let accessToken = getAccessToken();
  auth.client.userInfo(accessToken, (error, user) => {
    return cb(user);
  });
}

export function isLoggedInUser(cb, error) {
  const idToken = getIdToken();
  const access_token = getAccessToken();
  if (!!idToken && !isTokenExpired(idToken)) {

    auth.client.userInfo(access_token, (error, user) => {
      return cb(user);
    });
  } else {
    return error();
  }
}