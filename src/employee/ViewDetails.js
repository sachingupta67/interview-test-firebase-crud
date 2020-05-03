import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import CustomButton from '../components/Button';
import colors from '../styles/colors';

class ViewDetails extends React.Component {
  render() {
    const {handler, data, deleteHandler} = this.props;
    return (
      <View>
        <Text>Name : {data.user_name}</Text>
        <Text>Email : {data.email}</Text>
        <Text>Name : {data.contact_no}</Text>
        <Text>
          Location :{data.location.latitude + ' ' + data.location.longitude}
        </Text>
        <Text>Profile Pic</Text>
        <Avatar
          source={{
            uri:
              data.profile_pic ||
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          rounded
          size="medium"
        />
        <View style={styles.container}>
          <CustomButton
            title="Back"
            containerStyle={styles.back}
            handler={() => handler(false)}
          />
          <CustomButton
            title="Delete"
            containerStyle={styles.delete}
            handler={() => {
              handler(false);
              deleteHandler(data.id);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '4%',
  },
  back: {width: '45%', backgroundColor: colors.success},
  delete: {width: '45%', backgroundColor: colors.danger},
});

export default ViewDetails;
