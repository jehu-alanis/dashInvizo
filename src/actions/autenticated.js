
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setAuthenticated = (isAuthenticated) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated,
});