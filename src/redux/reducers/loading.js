import {isLoading} from '../constants/index';
const iState = {
  isLoading: false,
};
const loading = (state = iState, action) => {
  switch (action.type) {
    case isLoading.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loading;
