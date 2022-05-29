export const USER_ACTION = 'USER_ACTION';
export const ACTION_CURRENCIES = 'ACTION_CURRENCIES';
export const ACTION_EXPENSES = 'ACTION_EXPENSES';

export const actionSaveUser = (email) => ({
  type: USER_ACTION,
  payload: email,
});

export const changeCurrencies = (currencies) => ({
  type: ACTION_CURRENCIES,
  payload: currencies,
});

export const changeExpenses = (expenses) => ({
  type: ACTION_EXPENSES,
  payload: expenses,
});

export const fetchExpenses = (state) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    dispatch(changeExpenses({ ...state, exchangeRates: result }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    const coinsArray = Object.keys(result);
    dispatch(changeCurrencies(coinsArray));
  } catch (error) {
    console.log(error);
  }
};
