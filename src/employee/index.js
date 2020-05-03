import React from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MasterLayout from '../../src/components/Layout';
import CustomButton from '../../src/components/Button';
import Records from '../../src/employee/Records';
import AddEmployee from '../../src/employee/AddEmployee';
class Employee extends React.Component {
  state = {
    addEmployee: false,
  };
  handler = value => {
    this.setState({enabledShift: value});
  };
  addEmployeeHandler = status => {
    this.setState({addEmployee: status});
  };
  render() {
    const {addEmployee} = this.state;
    return (
      <MasterLayout headerTitle={'Employee Records'}>
        <View style={styles.addEmployee}>
          <CustomButton
            title="Add Employee"
            containerStyle={styles.add}
            handler={() => this.addEmployeeHandler(true)}
          />
        </View>
        <Records />
        {addEmployee ? (
          <AddEmployee
            handler={this.addEmployeeHandler}
            addEmployee={addEmployee}
          />
        ) : null}
      </MasterLayout>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    padding: '4%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2%',
    borderRadius: 10,
  },
  addEmployee: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    width: '30%',
  },
});
export default Employee;
