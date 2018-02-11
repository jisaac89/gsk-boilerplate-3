import { requestHelper } from '../utils/RequestHelpers';

const API_ROOT = 'http://ec2-34-226-168-251.compute-1.amazonaws.com:3000/api/cloud.aperio.viiv.';

export const hyperledger_requests = requestHelper(API_ROOT);