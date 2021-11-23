import fetchApi from '../services/fetchApi';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const SAVE_EXPENDITURE = 'SAVE_EXPENDITURE';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const REMOVE_EXPENDITURE = 'REMOVE_EXPENDITURE';
export const START_EDITING = 'START_EDITING';
export const END_EDITING = 'END_EDITING';

export const saveEmail = (payload) => (
  {
    type: INPUT_EMAIL,
    payload,
  }
);

export const addExpenditure = (payload, currentCurrency) => (
  {
    type: SAVE_EXPENDITURE,
    payload,
    currentCurrency,
  }
);

export const removeExpenditure = (payload) => (
  {
    type: REMOVE_EXPENDITURE,
    payload,
  }
);

export const addCurrencies = (currencies) => (
  {
    type: SAVE_CURRENCIES,
    currencies,
  }
);

export const getCurrentCurr = (payload) => async (dispatch) => {
  try {
    const currentCurrency = await fetchApi();
    dispatch(addExpenditure(payload, currentCurrency));
  } catch (e) {
    console.log(e.message);
  }
};

export const getCurrencies = () => async (dispatch) => {
  try {
    const result = await fetchApi();
    const currencies = [...Object.keys(result)];
    currencies.splice(currencies.indexOf('USDT'), 1);
    dispatch(addCurrencies(currencies));
  } catch (e) {
    console.log(e.message);
  }
};

export const startEditing = (payload) => ({
  type: START_EDITING,
  payload,
});

export const endEditing = (payload) => ({
  type: END_EDITING,
  payload,
});
