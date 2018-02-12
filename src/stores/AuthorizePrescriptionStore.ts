import {observable, computed, autorun} from 'mobx';

import {appStore} from '../stores/_GlobalStore';

import {notificationStore} from '../stores/NotificationStore';

import {IPrescription} from '../interfaces/data/IPrescription';

import api from '../api';
import Prescriptions from '../components/routes/prescriptions/Prescriptions';

export class AuthorizePrescriptionsStore {

  
}

export const authorizePrescriptionsStore = new AuthorizePrescriptionsStore();