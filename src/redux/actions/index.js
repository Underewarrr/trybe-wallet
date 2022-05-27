const LOGIN_ACTION = 'LOGIN_ACTION';
const SAVE_EXPENSES = 'SAVE_EXPENSES';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const actionTypes = {
  LOGIN_ACTION,
  SAVE_EXPENSES,
  REMOVE_EXPENSE,
};

// ACTIONS CREATORS

const loginAction = (payload) => ({
  type: LOGIN_ACTION,
  payload,
});

const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const actionCreators = {
  loginAction,
  saveExpenses,
  removeExpense,
};
