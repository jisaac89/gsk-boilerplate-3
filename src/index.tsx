import * as React from "react";
import * as ReactDOM from "react-dom";

import Entry from './components/Entry';

import * as promiseFinally from 'promise.prototype.finally';

import { Provider } from 'mobx-react';

import { appStore, labResultsStore, authStore, prescriptionsStore, discountsStore, notificationStore } from './stores/_GlobalStore'

import 'core-js';

const stores = {
    appStore,
    authStore,
    prescriptionsStore,
    notificationStore,
    discountsStore,
    labResultsStore
};

// debug
window['stores'] = stores;

promiseFinally.shim();

ReactDOM.render(
    <Provider {...stores}>
        <Entry />
    </Provider>,
    document.getElementById("root")
); 