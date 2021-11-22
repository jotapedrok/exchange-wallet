import { SAVE_CURRENCIES, SAVE_EXPENDITURE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EXPENDITURE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload,
        exchangeRates: action.currentCurrency }],
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  default:
    return state;
  }
}
