import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  Title,
  Subheading,
  Snackbar,
  Button,
  HelperText,
  Paragraph,
  RadioButton,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import { SERVER_URL } from '../../../app.json';

const ReserveChef = ({ navigation, route, customer }) => {
  const { colors } = useTheme();
  const [state, setState] = useState({
    amount: 0,
    days: '',
    name: '',
    daysError: {
      error: false,
      helperText: '',
    },
    loading: false,
    visible: false,
    snackbarMsg: '',
  });

  const bookChef = async () => {
    // console.log(route.params.id);
    if (state.days === '') {
      setState({
        ...state,
        daysError: {
          error: true,
          helperText: 'Please select days',
        },
      });
    } else {
      setState({
        ...state,
        loading: true,
      });
      let date = new Date();
      let timestamp = date.setDate(date.getDate() + Number(state.days));
      let data = {
        timestamp,
        customerId: customer.user._id,
        name: customer.user.name,
        phone: customer.user.phone,
      };
      try {
        let res = await axios.post(
          SERVER_URL + '/auth/booking?q=' + route.params.id,
          data,
        );
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Chef has been booked, He/She will contact you shortly',
        });
      } catch (e) {
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: "Can't request your booking right now !",
        });
        console.log(e);
      }
    }
  };
  const onDismissSnackBar = () => {
    setState({ ...state, visible: false });
    if (
      state.snackbarMsg ===
      'Chef has been booked, He/She will contact you shortly'
    ) {
      navigation.navigate('Home');
    }
  };

  const selectDays = (i) => {
    if (i === '1') {
      setState({
        ...state,
        days: i,
        daysError: {
          error: false,
          helperText: '',
        },
        amount: 400,
      });
    } else if (i === '3') {
      setState({
        ...state,
        days: i,
        daysError: {
          error: false,
          helperText: '',
        },
        amount: 1100,
      });
    } else if (i === '7') {
      setState({
        ...state,
        days: i,
        daysError: {
          error: false,
          helperText: '',
        },
        amount: 2400,
      });
    }
  };
  return (
    <>
      <Spinner visible={state.loading} />
      <Snackbar
        visible={state.visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {state.snackbarMsg}
      </Snackbar>
      <ScrollView style={styles.container}>
        <View
          style={{
            borderColor: 'purple',
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Subheading style={{ color: colors.primary }}>Chef Name :</Subheading>
            <Subheading> {route.params.name}</Subheading>
          </View>
          <Subheading style={{ color: colors.primary, marginBottom: 10 }}>
            Booking Details
          </Subheading>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="first"
              color="#6C3483"
              status={state.days === '1' ? 'checked' : 'unchecked'}
              onPress={() => selectDays('1')}
            />
            <Paragraph>Book for 1 day</Paragraph>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="first"
              color="#6C3483"
              status={state.days === '3' ? 'checked' : 'unchecked'}
              onPress={() => selectDays('3')}
            />
            <Paragraph>Book for 3 days</Paragraph>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="first"
              color="#6C3483"
              status={state.days === '7' ? 'checked' : 'unchecked'}
              onPress={() => selectDays('7')}
            />
            <Paragraph>Book for 7 days</Paragraph>
          </View>
          <HelperText type="error" visible={state.daysError.error}>
            {state.daysError.helperText}
          </HelperText>

          <Subheading style={{ fontStyle: 'italic' }}>
            Amount for Booking : {state.amount}
          </Subheading>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          style={{ marginVertical: 20 }}
          onPress={() => bookChef()}>
          Confirm Booking
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: 'white',
  },
  btn: {
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6C3483',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  title: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderBottomColor: 'red',
  },
  dropdownWrapper: {
    borderBottomColor: '#6C3483',
    borderBottomWidth: 1,
    opacity: 0.8,
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
    // marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, {})(ReserveChef);
