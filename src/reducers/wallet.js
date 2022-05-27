import { actionTypes } from '../redux/actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.SAVE_TASK:
    return { ...state, task: action.task };
  case actionTypes.SAVE_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case actionTypes.REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => action.payload !== id),
    };
  default:
    return state;
  }
};

export default wallet;
