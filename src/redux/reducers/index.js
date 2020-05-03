import error from './error';
import loading from './loading';
import user from './user';
import {combineReducers} from 'redux';
export default combineReducers({
  user: user,
  loading: loading,
  error: error,
});
