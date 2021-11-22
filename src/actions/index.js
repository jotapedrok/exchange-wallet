import fetchApi from '../services/fetchApi';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const SAVE_EXPENDITURE = 'SAVE_EXPENDITURE';

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

export const getCurrentCurr = (payload) => async (dispatch) => {
  try {
    const currentCurrency = await fetchApi();
    dispatch(addExpenditure(payload, currentCurrency));
  } catch (e) {
    console.log(e.message);
  }
};
