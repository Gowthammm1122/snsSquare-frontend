/** ****************************** Import libs *********************************** */
import { getListByApi } from './actions';
import { URL_CONSTANTS } from './urls';

/* Login */
export const fetchUsers = (params) => {
  return getListByApi(URL_CONSTANTS.fetchUsers, params);
}