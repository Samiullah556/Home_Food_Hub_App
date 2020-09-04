import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useTheme} from 'react-native-paper';
import {PrimaryColor} from '../../utils/formValidation';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {
  Button,
  Title,
  TextInput,
  Subheading,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {fieldValidate} from '../../utils/formValidation';
import Logo from '../../assets/logo.png';
import {SERVER_URL} from '../../../app.json';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const ChangePassword = ({navigation, auth}) => {
  const [state, setState] = useState({
    checked: false,
    oldPassword: '',
    Newpassword: '',
    Newpassword2: '',
    oldPasswordError: {
      error: false,
      helperText: '',
    },
    NewpasswordError: {
      error: false,
      helperText: '',
    },
    Newpassword2Error: {
      error: false,
      helperText: '',
    },
    snackbarMsg: '',
    visible: false,
    loading: false,
    snackbarMsg: '',
  });

  const validateForm = () => {
    let oldPasswordError = fieldValidate(state.oldPassword, 'password');
    let NewpasswordError = fieldValidate(state.Newpassword, 'password');
    let Newpassword2Error = fieldValidate(state.Newpassword2, 'password');
    console.log(state.oldPassword);
    setState({...state, oldPasswordError, NewpasswordError, Newpassword2Error});
    if (
      oldPasswordError.error ||
      NewpasswordError.error ||
      Newpassword2Error.error
    ) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = async () => {
    try {
      if (!validateForm()) {
        setState({
          ...state,
          loading: true,
        });
        let data = {
          email: auth.user.email,
          oldpassword: state.oldPassword,
          newpassword: state.Newpassword,
        };
        console.log(data);
        const response = await axios.put(
          SERVER_URL + '/auth/updatepassword?q=chef',
          data,
        );
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Password Changed Successfully',
        });
      }
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: 'Error ! Incorrect Password',
      });
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Password Changed Successfully') {
      navigation.navigate('Dashboard');
    }
  };
  const {colors} = useTheme();

  return (
    <>
      <Spinner visible={state.loading} />
      <Snackbar
        visible={state.visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {state.snackbarMsg}
      </Snackbar>
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Logo} />
          </View>
          <Title style={styles.heading}>Reset Password</Title>
          <Subheading style={{color: colors.primary}}>Old Password</Subheading>
          <TextInput
            style={styles.formControl}
            secureTextEntry
            value={state.oldpassword}
            error={state.oldPasswordError.error}
            onChangeText={(text) => setState({...state, oldPassword: text})}
          />
          <HelperText type="error" visible={state.oldPasswordError.error}>
            {state.oldPasswordError.helperText}
          </HelperText>

          <Subheading style={{color: colors.primary}}>New Password</Subheading>
          <TextInput
            style={styles.formControl}
            secureTextEntry
            value={state.Newpassword}
            error={state.NewpasswordError.error}
            onChangeText={(text) => setState({...state, Newpassword: text})}
          />
          <HelperText type="error" visible={state.NewpasswordError.error}>
            {state.NewpasswordError.helperText}
          </HelperText>

          <Subheading style={{color: colors.primary}}>
            Confirm New Password
          </Subheading>
          <TextInput
            style={styles.formControl}
            secureTextEntry
            error={state.Newpassword2Error.error}
            value={state.Newpassword2}
            onChangeText={(text) => setState({...state, Newpassword2: text})}
          />
          <HelperText type="error" visible={state.Newpassword2Error.error}>
            {state.Newpassword2Error.helperText}
          </HelperText>

          <Button
            style={styles.loginBtn}
            mode="contained"
            uppercase={false}
            onPress={() => signIn()}>
            Submit
          </Button>
        </View>
        <Snackbar
          visible={state.visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'OK',
            onPress: () => {
              onDismissSnackBar();
            },
          }}>
          {state.snackbarMsg}
        </Snackbar>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
  },
  logoContainer: {
    marginHorizontal: 40,
    marginVertical: 30,
  },
  logo: {
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  heading: {
    color: PrimaryColor,
    marginVertical: 20,
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
  },

  clickMe: {
    fontWeight: 'bold',
    color: PrimaryColor,
  },
  loginBtn: {
    textTransform: 'lowercase',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(ChangePassword);
