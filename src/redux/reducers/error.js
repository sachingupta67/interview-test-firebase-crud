import {error} from '../constants/index';
const iState = {
  error: {},
};
const errors = (state = iState, action) => {
  switch (action.type) {
    case error.IS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default errors;
