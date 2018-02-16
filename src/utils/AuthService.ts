import * as decode from 'jwt-decode';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

export async function login() {
  // client connection to server goes here.
}

export async function logout() {
  clearIdToken();
  clearAccessToken();
  return await null;
}

export async function signUp(email, password) {
  // client connection to server goes here.
}

export function getIdToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}



function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}



// Helper function that will allow us to extract the access_token and id_token
// Right now i have commented out the body of the function and returned a sample jwt token.
function getParameterByName(name) {
  // let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  // return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjllYmEzMDcyLWI5ZjItNDE2Yi1iMjhjLTkyM2E1NWNjZDNhMyIsImlhdCI6MTUxODU1NjMxOCwiZXhwIjoxNTE4NTU5OTE4fQ.rFzakVnuw-uDLJbzsOFY0yIJXrCHS-6gQanOxv-fPl0';
}

// Get and store access_token in local storage
export async function setAccessToken(t?: any) {
  let accessToken = t || getParameterByName('access_token');
  await localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export async function isLoggedIn() {
  // const idToken = getIdToken();
  const access_token = window.localStorage.getItem('access_token');
  return await !!access_token && !isTokenExpired(access_token);
}

export function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

export function getUserDetails(encodedToken) {
  const token = decode(encodedToken);
  if (!token.name) { return null; }
  const name = token.name;
  return name;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export async function getAccessToken() {
  return await localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function clearAccessToken() {
  return await localStorage.removeItem(ACCESS_TOKEN_KEY);
}