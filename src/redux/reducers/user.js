import {user} from '../constants/index';
const iState = {
  records: [],
  success: '',
};

const users = (state = iState, action) => {
  switch (action.type) {
    case user.GET_SUCCESS:
      return {
        ...state,
        records: action.payload,
      };
    case user.ADD_SUCCESS:
      return {...state, success: action.payload};
    default:
      return state;
  }
};

export default users;
