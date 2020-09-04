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
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../redux/actions/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import SellFoodStack from '../../navigation/SellFoodStack';

const Login = ({navigation, setCurrentUser, auth}) => {
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

  useEffect(() => {
    if (auth.authenticated) {
      navigation.navigate('Dashboard');
    }
  }, [auth.authenticated]);

  const validateForm = () => {
    let emailError = fieldValidate(state.email, 'email');
    let passwordError = fieldValidate(state.password, 'password');
    setState({...state, emailError, passwordError});
    if (emailError.error || passwordError.error) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = async () => {
    if (!validateForm()) {
      let data = {
        email: state.email.toLowerCase(),
        password: state.password,
      };

      setState({
        ...state,
        loading: true,
        emailError: {error: false, helperText: ''},
        passwordError: {error: false, helperText: ''},
      });

      if (state.email === 'admin@homefoodhub.com') {
        setState({
          ...state,
          visible: true,
          snackbarMsg: "Admin can't login from user app",
        });
      } else {
        try {
          const response = await axios.post(
            SERVER_URL + '/auth/login?q=chef',
            data,
          );
          // console.log(response.data);
          const {user} = response.data;
          setCurrentUser(user);

          setState({
            ...state,
            loading: false,
            email: '',
            password: '',
          });

          await AsyncStorage.setItem('token', response.data.user._id);
          navigation.navigate('Dashboard');
        } catch (e) {
          console.log(e);
          setState({
            ...state,
            visible: true,
            password: '',
            snackbarMsg: 'Incorrect Email (or) Password !',
          });
        }
      }
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
  };
  const {colors} = useTheme();

  return (
    <>
      <Snackbar
        visible={state.visible}
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
          <Title style={styles.heading}>Sign In</Title>
          <Subheading style={{color: colors.primary}}>EMAIL</Subheading>
          <TextInput
            style={styles.formControl}
            keyboardType="email-address"
            autoCompleteType="email"
            value={state.email}
            error={state.emailError.error}
            onChangeText={(text) => setState({...state, email: text})}
          />
          <HelperText type="error" visible={state.emailError.error}>
            {state.emailError.helperText}
          </HelperText>
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
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChefForgotPassword')}>
              <Text style={styles.clickMe}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button
            style={styles.loginBtn}
            mode="contained"
            uppercase={false}
            onPress={() => signIn()}>
            Submit
          </Button>
          <View style={styles.bottomRow}>
            <Text>Create an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.clickMe}> Signup here</Text>
            </TouchableOpacity>
          </View>
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
  },
  loginBtn: {
    textTransform: 'lowercase',
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {setCurrentUser})(Login);
