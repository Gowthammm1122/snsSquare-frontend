// /** ****************************** Import libs *********************************** */
// import { hostConfig } from '../../config/index.js';
// import API from '../api';
// import { URL_CONSTANTS } from './urls';

// /* ReLogin API */
// export const reLogin = async () => {
//   const loggedUser = localStorage.getItem('loggedUser');
//   if (!loggedUser) {
//     return { error: 'User is not logged in' };
//   }

//   const accessToken = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');

//   if (accessToken && refreshToken) {
//     const extractExpiryFromJWT = (token) => {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         return payload.exp ? new Date(payload.exp * 1000) : null;
//       } catch (error) {
//         console.error('Error decoding JWT:', error);
//         return null;
//       }
//     };

//     const expiryTime = extractExpiryFromJWT(accessToken);

//     const currentTime = new Date();
//     if (!expiryTime || expiryTime < currentTime) {
//       const params = { refreshToken };

//       try {
//         const response = await fetch(
//           `${hostConfig.API_URL}${URL_CONSTANTS.refreshToken}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Accept: 'application/json',
//             },
//             body: JSON.stringify(params),
//           }
//         );

//         if (!response.ok) {
//           throw new Error('Failed to refresh token');
//         }
//         const res = await response.json();
//         localStorage.setItem('token', res.access.token);
//         localStorage.setItem('refreshToken', res.refresh.token);
//         return true;
//       } catch {
//         localStorage.clear();
//         window.location.href = '/login';
//       }
//     }
//   } else {
//     localStorage.clear();
//     window.location.href = '/login';
//   }
// };

// /* POST API */
// export const postDataApi = async (requestUrl, params) => {
//   try {
//     const response = await API.post(requestUrl, params);
//     return response.data;
//   } catch (error) {
//     console.error('Error in postDataApi:', error);
//     throw error;
//   }
// };

// export const isTokenExpired = () => {
//   const accessExpiry = localStorage.getItem('accessExpiry');
//   if (!accessExpiry) return true;

//   return new Date(accessExpiry) < new Date();
// };

// /* GET API */
// export const getListByApi = async (requestUrl, params) => {
//   try {
//     const response = await API.get(requestUrl, { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error in getListByApi:', error);
//     throw error;
//   }
// };

// /* GET - ViewData API */
// export const viewDataByApi = async (requestUrl, dataId) => {
//   try {
//     const response = await API.get(`${requestUrl}/${dataId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error in viewDataByApi:', error);
//     throw error;
//   }
// };

// /* PUT API */
// export const putDataApi = async (
//   requestUrl,
//   params,
//   id,
//   roleId,
//   designation,
//   method
// ) => {
//   try {
//     let getParams = '';
//     if (roleId) getParams += `/${roleId}`;
//     if (designation) getParams += `?designation=${designation}`;
//     if (method) getParams += `&method=${method}`;

//     const response = await API.put(`${requestUrl}/${id}${getParams}`, params);
//     return response.data;
//   } catch (error) {
//     console.error('Error in putDataApi:', error);
//     throw error;
//   }
// };

// export const normalPutDataApi = async (requestUrl, params) => {
//   try {
//     const response = await API.put(`${requestUrl}`, params);
//     return response.data;
//   } catch (error) {
//     console.error('Error in putDataApi:', error);
//     throw error;
//   }
// };


// /* PATCH API */
// export const patchDataApi = async (requestUrl, params) => {
//   try {
//     const response = await API.patch(requestUrl, params);
//     return response.data;
//   } catch (error) {
//     console.error('Error in patchDataApi:', error);
//     throw error;
//   }
// };

// /* PATCH - PatchFormData API */
// export const patchFormDataApi = async (requestUrl, formData) => {
//   try {
//     const response = await API.patch(requestUrl, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in patchFormDataApi:', error);
//     throw error;
//   }
// };

// /* DELETE API */
// export const deleteDataApi = async (requestUrl) => {
//   try {
//     const response = await API.delete(`${requestUrl}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error in deleteDataApi:', error);
//     throw error;
//   }
// };

// /* DELETE - DeleteUserData API */
// export const deleteUserDataApi = async (requestUrl) => {
//   try {
//     const response = await API.delete(`${requestUrl}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error in deleteUserDataApi:', error);
//     throw error;
//   }
// };

// /* GET - Download API */
// export const downloadApi = async (requestUrl, dataId) => {
//   try {
//     const response = await API.get(`${requestUrl}?candidateId=${dataId}`, {
//       responseType: 'arraybuffer',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in downloadApi:', error);
//     throw error;
//   }
// };

// /* POST - PostForm API */
// export const postFormApi = async (requestUrl, params) => {
//   try {
//     const response = await API.post(requestUrl, params, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in postFormApi:', error);
//     throw error;
//   }
// };

// /* GET - View Download API */
// export const view_downloadApi = async (requestUrl, submissionId, action) => {
//   try {
//     const response = await API.get(
//       `${requestUrl}/${submissionId}?options=${action}`,
//       {
//         responseType: 'blob',
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error in view_downloadApi:', error);
//     throw error;
//   }
// };

// /* GET-View Attachment of ticket API*/
// export const view_downloadTicketAttachment = async (
//   requestUrl,
//   ticketId,
//   action
// ) => {
//   try {
//     const response = await API.get(
//       `${requestUrl}/${ticketId}?options=${action}`,
//       {
//         responseType: 'blob',
//       }
//     );
//     const contentType = response.headers['content-type'];
//     const contentDisposition = response.headers['content-disposition'];

//     let filename = 'downloaded_file';
//     if (contentDisposition) {
//       const match = contentDisposition.match(/filename="?([^"]+)"?/);
//       if (match) {
//         filename = match[1];
//       }
//     }

//     const fileBlob = new Blob([response.data], { type: contentType });
//     const fileUrl = URL.createObjectURL(fileBlob);

//     if (action === 'download') {
//       const link = document.createElement('a');
//       link.href = fileUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       return fileUrl;
//     }

//     if (contentType.includes('pdf') || contentType.includes('image')) {
//       window.open(fileUrl, '_blank');
//     } else {
//       const link = document.createElement('a');
//       link.href = fileUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }

//     return fileUrl;
//   } catch (error) {
//     console.error('Error in view_downloadTicketAttachment:', error);
//     throw error;
//   }
// };

// /* GET - DownloadFile API */
// export const downloadFileApi = async (submissionId, action) => {
//   try {
//     const response = await API.get(`${submissionId}?options=${action}`, {
//       responseType: 'arraybuffer',
//     });
//     return new Blob([response.data], {
//       type: 'application/pdf, image/png, image/jpeg',
//     });
//   } catch (error) {
//     console.error('Error in downloadFileApi:', error);
//     throw error;
//   }
// };