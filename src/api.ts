import {requests} from './connections/request';
import {hyperledger_requests} from './connections/hyperledger_request';
import { IPrescription } from './interfaces/data/IPrescription';

let Patient  = (email, password)  =>{
  return {
    email : email,
    "pass": password,
    "firstName":email,
    "lastName":email,
  } 
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/loginhcp', Patient(email, password)),
  register: (email, password) =>
    requests.put('/patients/'+email, Patient(email, password)),
  save: (user) =>
    requests.put('/patients/', user)
};

const Prescriptions = {
  all: () =>
    hyperledger_requests.get(`Prescription`),
  create: (prescription) => 
    hyperledger_requests.post(`Prescription`, prescription),
  delete: (prescriptionuuid : string) => 
    hyperledger_requests.del(`Prescription/`+ prescriptionuuid)
};

const Patients = {
  all: () =>
    hyperledger_requests.get(`Patient`)
};

export default {
  Auth,
  Patients,
  Prescriptions
};