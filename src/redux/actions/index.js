import {user, error, isLoading} from '../constants';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';

export const addUser = data => async dispatch => {
  try {
    dispatch(loadingHandler(true));
    database()
      .ref('users')
      .push()
      .set(data);
    dispatch(successResponseHandler(user.ADD_SUCCESS, 'success'));
    dispatch(getRecords()); //
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(loadingHandler(false));
    Alert.alert('Try after some time');
  }
};

export const getRecords = () => async dispatch => {
  try {
    dispatch(loadingHandler(true));
    let data = await database()
      .ref('users')
      .once('value');
    let list = data.val() ? data.val() : null;
    if (list) {
      let userKey = Object.keys(data.val());
      let userData = Object.values(data.val());
      if (userKey.length && userData.length) {
        let userList = userData.map((item, i) => {
          return {
            id: userKey[i],
            contact_no: item.contact_no,
            created_at: item.created_at,
            email: item.email,
            location: item.location,
            profile_pic: item.profile_pic || null,
            user_name: item.user_name,
          };
        });
        console.log('userlist====>', userList);
        dispatch(successResponseHandler(user.GET_SUCCESS, userList));
        dispatch(loadingHandler(false));
      }
    }

    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(loadingHandler(false));
    Alert.alert('Try after some time');
  }
};

export const deleteRecord = id => async dispatch => {
  try {
    dispatch(loadingHandler(true));
    database()
      .ref('users/' + id)
      .remove();
    dispatch(getRecords());
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(loadingHandler(false));
    Alert.alert('Try after some time');
  }
};

const loadingHandler = status => {
  return {type: isLoading.IS_LOADING, payload: status};
};

const errorHandler = status => {
  return {type: error.IS_ERROR, payload: status};
};

const successResponseHandler = (type, payload) => {
  return {type: type, payload: payload};
};
