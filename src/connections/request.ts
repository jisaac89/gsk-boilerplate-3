import { requestHelper } from '../utils/RequestHelpers';

const API_ROOT = 'http://ec2-35-169-99-210.compute-1.amazonaws.com:5984/';

export const requests = requestHelper(API_ROOT);