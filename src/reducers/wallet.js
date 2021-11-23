import { END_EDITING,
  REMOVE_EXPENDITURE,
  SAVE_CURRENCIES,
  SAVE_EXPENDITURE,
  START_EDITING,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  editing: {},
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
  case REMOVE_EXPENDITURE:
    return {
      ...state,
      expenses: action.payload,
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case START_EDITING:
    return {
      ...state,
      isEditing: true,
      editing: action.payload,
    };
  case END_EDITING:
    return {
      ...state,
      isEditing: false,
      expenses: action.payload,
    };
  default:
    return state;
  }
}
