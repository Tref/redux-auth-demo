import { fetch } from 'redux-auth';

export const REQUEST_TUTORIALS_START = 'REQUEST_TUTORIALS_START';
export const REQUEST_TUTORIALS_COMPLETE = 'REQUEST_TUTORIALS_COMPLETE';
export const REQUEST_TUTORIALS_ERROR = 'REQUEST_TUTORIALS_ERROR';
export const DISMISS_REQUEST_TUTORIALS_SUCCESS_MODAL = 'DISMISS_REQUEST_TUTORIALS_SUCCESS_MODAL';
export const DISMISS_REQUEST_TUTORIALS_ERROR_MODAL = 'DISMISS_REQUEST_TUTORIALS_ERROR_MODAL';

export function dismissRequestTestSuccessModal() {
  return { type: DISMISS_REQUEST_TUTORIALS_SUCCESS_MODAL };
}
export function dismissRequestTestErrorModal() {
  return { type: DISMISS_REQUEST_TUTORIALS_ERROR_MODAL };
}
export function requestTestStart(key) {
  return { type: REQUEST_TUTORIALS_START, key };
}
export function requestTestComplete(key) {
  return { type: REQUEST_TUTORIALS_COMPLETE, key };
}
export function requestTestError(key) {
  return { type: REQUEST_TUTORIALS_ERROR, key };
}
export function requestTest(url, key) {
  return dispatch => {
    dispatch(requestTestStart(key));

    return fetch(url, {
      credentials: 'include'
    })
      .then(resp => {
        console.log('got resp');
        if (resp && resp.statusText === 'OK') {
          dispatch(requestTestComplete(key));
        } else {
          dispatch(requestTestError(key));
        }

        console.log('retrieving json');

        return resp.json();
      })
      .then(json => {
        console.log('@-->resp json', json);
        return json;
      })
      .catch(resp => {
        console.log('fail', resp);
        dispatch(requestTestError(key));
      });
  };
}
