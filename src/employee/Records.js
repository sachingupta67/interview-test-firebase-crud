import React from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Avatar} from 'react-native-paper';
import colors from '../styles/colors';
import CustomButton from '../components/Button';
import CustomModal from '../components/Modal';
import ViewDetails from './ViewDetails';
import {connect} from 'react-redux';
import {getRecords, deleteRecord} from '../redux/actions';
import database from '@react-native-firebase/database';

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false,
      data: [],
      user: {},
    };
  }
  async componentDidMount() {
    this.props.getRecords();
  }
  viewDetailsHandler = (status, user) => {
    this.setState({details: status, user: user});
  };
  deleteRecord = id => {
    this.props.deleteRecord(id);

    //  this.setState({details: status});
  };
  render() {
    const {details, user} = this.state;
    const {list} = this.props;
    console.log(list);
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {list.length ? (
          list
            .sort((a, b) => a.created_at < b.created_at)
            .map((item, i) => (
              <View style={styles.container} key={i}>
                <View style={styles.avatarWidth}>
                  <Avatar.Image
                    source={{
                      uri:
                        item.profile_pic ||
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                    size={35}
                  />
                </View>
                <View style={styles.user}>
                  <Text>{item.user_name}</Text>
                </View>
                <CustomButton
                  title="View"
                  handler={() => {
                    this.viewDetailsHandler(true, item);
                  }}
                  containerStyle={styles.buttonSuccess}
                />
                <CustomButton
                  title="Delete"
                  handler={() => this.deleteRecord(item.id)}
                  containerStyle={styles.buttonDanger}
                />
              </View>
            ))
        ) : (
          <View style={styles.container}>
            <Text>No Records</Text>
          </View>
        )}

        {details ? (
          <CustomModal
            visible={details}
            modalTitle={'View Details'}
            content={
              <ViewDetails
                handler={this.viewDetailsHandler}
                data={user}
                deleteHandler={this.deleteRecord}
              />
            }
          />
        ) : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonSuccess: {width: '15%', backgroundColor: colors.success},
  buttonDanger: {width: '15%', backgroundColor: colors.danger},
  user: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    margin: '2%',
    borderRadius: 5,
    padding: '.5%',
  },
  avatarWidth: {width: '10%'},
  scrollView: {paddingBottom: '10%'},
});
const mapStateToProps = ({user}) => {
  const {records} = user;
  return {list: records};
};

export default connect(
  mapStateToProps,
  {getRecords, deleteRecord},
)(Records);
