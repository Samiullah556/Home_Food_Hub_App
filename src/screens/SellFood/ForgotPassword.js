import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useTheme} from 'react-native-paper';
import {PrimaryColor} from '../../utils/formValidation';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
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

const Login = ({navigation, addCustomer}) => {
  const [state, setState] = useState({
    checked: false,
    email: '',
    password: '',
    emailError: {
      error: false,
      helperText: '',
    },
    passwordError: {
      error: false,
      helperText: '',
    },
    snackbarMsg: '',
    visible: false,
    loading: false,
  });
  const [step, setStep] = useState(1);

  const resetPassword = async () => {
    if (state.password === '' || state.password.length < 6) {
      setState({
        ...state,
        passwordError: {
          error: true,
          helperText: 'Password must contain atleast 6 characters',
        },
      });
    } else {
      setState({
        ...state,
        loading: true,
        passwordError: {
          error: false,
          helperText: '',
        },
      });
      try {
        let data = {
          email: state.email,
          newpassword: state.password,
          oldpassword: '',
        };
        let res = await axios.put(
          SERVER_URL + '/auth/updatepassword?q=chef',
          data,
        );
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Password has been changed !',
        });
      } catch (e) {
        console.log(e);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Something went wrong !',
        });
      }
    }
  };

  const checkEmail = async () => {
    if (state.email !== '') {
      let data = {
        email: state.email.toLowerCase(),
      };
      setState({
        ...state,
        loading: true,
        emailError: {
          error: false,
          helperText: '',
        },
      });
      if (state.email === 'admin@homefoodhub.com') {
        setState({
          ...state,
          visible: true,
          snackbarMsg: "Admin can't Reset Password from User app",
        });
      } else {
        try {
          const response = await axios.post(
            SERVER_URL + '/auth/check?q=chef',
            data,
          );
          console.log(response.data);
          setState({
            ...state,
            loading: false,
          });
          setStep(2);
        } catch (e) {
          // console.log(e);
          setState({
            ...state,
            visible: true,
            password: '',
            snackbarMsg: 'Email not found !',
          });
        }
      }
    } else {
      setState({
        ...state,
        emailError: {
          error: true,
          helperText: 'Please Enter Valid Email',
        },
      });
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Password has been changed !') {
      navigation.navigate('Auth Stack');
    }
  };
  const {colors} = useTheme();

  return (
    <>
      <Snackbar
        visible={state.visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        action={{
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {state.snackbarMsg}
      </Snackbar>
      <Spinner visible={state.loading} />
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
        <View style={{paddingHorizontal: 30}}>
          <Title style={styles.heading}>Reset Password</Title>
          <Subheading style={{color: colors.primary}}>EMAIL</Subheading>
          <TextInput
            style={styles.formControl}
            keyboardType="email-address"
            autoCompleteType="email"
            disabled={step === 2 ? true : false}
            value={state.email}
            error={state.emailError.error}
            onChangeText={(text) => setState({...state, email: text})}
          />
          <HelperText type="error" visible={state.emailError.error}>
            {state.emailError.helperText}
          </HelperText>
          {step === 2 ? (
            <>
              <Subheading style={{color: colors.primary}}>PASSWORD</Subheading>
              <TextInput
                style={styles.formControl}
                secureTextEntry
                selectTextOnFocus={true}
                error={state.passwordError.error}
                value={state.password}
                onChangeText={(text) => setState({...state, password: text})}
              />
              <HelperText type="error" visible={state.passwordError.error}>
                {state.passwordError.helperText}
              </HelperText>
            </>
          ) : null}

          {step === 1 ? (
            <Button
              style={styles.loginBtn}
              mode="contained"
              uppercase={false}
              onPress={() => checkEmail()}>
              Next
            </Button>
          ) : null}
          {step === 2 ? (
            <Button
              style={styles.loginBtn}
              mode="contained"
              uppercase={false}
              onPress={() => resetPassword()}>
              Reset Password
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
  },
  logoContainer: {
    marginVertical: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    color: PrimaryColor,
    marginVertical: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  clickMe: {
    fontWeight: 'bold',
    color: PrimaryColor,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    textTransform: 'lowercase',
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Login);
