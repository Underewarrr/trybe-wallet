const LOGIN_ACTION = 'LOGIN_ACTION';

export const actionTypes = {
  LOGIN_ACTION,
};

// ACTIONS CREATORS

const loginAction = (payload) => ({
  type: LOGIN_ACTION,
  payload,
});

export const actionCreators = {
  loginAction,
};
