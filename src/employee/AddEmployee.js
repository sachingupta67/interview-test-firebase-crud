import React from 'react';

import {View, StyleSheet, Alert, Text} from 'react-native';
import CustomModal from '../components/Modal';
import CustomTextInput from '../components/Form/CustomTextInput';
import CustomButton from '../components/Button';
import colors from '../styles/colors';
import regex from '../helpers/Utility/regex';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Location from './Location';
import {connect} from 'react-redux';
import {addUser} from '../redux/actions';
class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      email: '',
      user: '',
      cno: '',
      pic: '',
      location: {},
    };
  }
  nextButtonHandler = () => {
    const {active, email, user, cno, pic, location} = this.state;
    if (active === 1) {
      user.length > 5
        ? this.setState({active: 2})
        : Alert.alert('Name must at least 6 characters');
    }

    if (active === 2) {
      regex.validateEmail(email)
        ? this.setState({active: 3})
        : Alert.alert('Email is not valid');
    }
    if (active === 3) {
      regex.validateMobile(cno)
        ? this.setState({active: 4})
        : Alert.alert('Phone number is not valid');
    }
    if (active === 4) {
      location.latitude && location.longitude
        ? this.setState({active: 5})
        : Alert.alert('Location not get correctly');
    }
    if (active === 5) {
      pic ? this.submitDetails() : Alert.alert('Please select image.');
    }
  };

  nameHandler = name => {
    this.setState({user: name});
  };
  emailHandler = email => {
    this.setState({email: email});
  };
  contactNoHandler = number => {
    this.setState({cno: number});
  };
  userImageHandler = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        Alert.alert('Image selection cancelled');
      } else if (response.error) {
        Alert.alert(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri);
        this.setState({
          pic: response.uri,
        });
      }
    });
  };
  locationHandler = async location => {
    this.setState({location: location});
  };
  submitDetails = () => {
    const {user, pic, email, cno, location} = this.state;
    if (pic) {
      const data = {
        user_name: user.trim(),
        profile_pic: pic,
        email: email,
        contact_no: cno,
        location: location,
        created_at: Date.now(),
      };
      this.props.handler(false);
      this.props.addUser(data);
    } else {
      Alert.alert('Please select image');
    }
  };
  backHandler = () => {
    this.setState({active: 1});
    this.props.handler(false);
  };
  render() {
    const {handler, addEmployee} = this.props;
    const {active, email, user, cno, pic} = this.state;
    const buttonText = active === 4 ? 'SUBMIT' : 'NEXT';
    return (
      <CustomModal
        handler={handler}
        visible={addEmployee}
        modalTitle={'Enter employee details'}
        content={
          <View style={styles.form}>
            {active === 1 ? (
              <CustomTextInput
                label="Name"
                placeholder="Enter your name"
                value={user}
                onChangeText={this.nameHandler}
              />
            ) : null}
            {active === 2 ? (
              <CustomTextInput
                label="Email"
                placeholder="Enter your email"
                keyboardType={'email-address'}
                value={email}
                onChangeText={this.emailHandler}
              />
            ) : null}
            {active === 3 ? (
              <CustomTextInput
                label="Contact No"
                placeholder="enter your contact number"
                keyboardType={'phone-pad'}
                value={cno}
                onChangeText={this.contactNoHandler}
              />
            ) : null}
            {active === 4 ? (
              <>
                <Location handler={this.locationHandler} />
                <Avatar
                  source={
                    pic
                      ? {uri: pic}
                      : {
                          uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }
                  }
                  size="xlarge"
                  rounded
                  containerStyle={styles.avatar}
                  onPress={this.userImageHandler}
                />
              </>
            ) : null}

            <View style={styles.buttonContainer}>
              <CustomButton
                title={buttonText}
                containerStyle={styles.button}
                handler={() => {
                  active === 4
                    ? this.submitDetails()
                    : this.nextButtonHandler();
                }}
              />
            </View>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },
  button: {
    width: '30%',
    backgroundColor: colors.success,
    marginTop: '2%',
  },
  form: {
    marginTop: '5%',
  },
  avatar: {marginLeft: '30.5%', marginTop: '-4%'},
  back: {padding: '3%', backgroundColor: 'red'},
});
export default connect(
  null,
  {addUser},
)(AddEmployee);
