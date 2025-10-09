/** ****************************** Import libs *********************************** */
import { postDataApi } from './actions';
import { URL_CONSTANTS } from './urls';

/* Login */
export const createUser = (params) => {
  return postDataApi(URL_CONSTANTS.signup, params);
};