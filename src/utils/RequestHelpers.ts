import { authStore, appStore } from '../stores/_GlobalStore';

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
