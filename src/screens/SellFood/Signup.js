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
  Checkbox,
  Subheading,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {fieldValidate} from '../../utils/formValidation';
import Logo from '../../assets/logo.png';
import {SERVER_URL} from '../../../app.json';
import Spinner from 'react-native-loading-spinner-overlay';

const SignUp = ({navigation}) => {
  const [state, setState] = useState({
    checked: false,
    email: '',
    fullName: '',
    password: '',
    phone: '',
    emailError: {},
    nameError: {},
    passwordError: {},
    phoneError: {},
    termsError: {},
    snackbarMsg: '',
    visible: false,
    loading: false,
  });

  const {colors} = useTheme();

  const validateForm = () => {
    let emailError = fieldValidate(state.email, 'email');
    let nameError = fieldValidate(state.fullName, 'name');
    let passwordError = fieldValidate(state.password, 'password');
    let phoneError = fieldValidate(state.phone, 'code');
    let termsError = {};
    if (state.checked) {
      termsError.error = false;
    } else {
      termsError.error = true;
    }
    setState({
      ...state,
      emailError,
      passwordError,
      nameError,
      phoneError,
      termsError,
    });
    if (
      emailError.error ||
      nameError.error ||
      passwordError.error ||
      phoneError.error ||
      termsError.error
    ) {
      return true;
    } else {
      return false;
    }
  };

  const signUp = async () => {
    if (!validateForm()) {
      // console.log(state.email, state.password, state.fullName, state.phone);
      let data = {
        name: state.fullName,
        email: state.email.toLowerCase(),
        password: state.password,
        phone: state.phone,
      };
      setState({
        ...state,
        emailError: {error: false, helperText: ''},
        passwordError: {error: false, helperText: ''},
        nameError: {error: false, helperText: ''},
        phoneError: {error: false, helperText: ''},
        loading: true,
      });
      try {
        const response = await axios.post(
          SERVER_URL + '/auth/register?q=chef',
          data,
        );
        console.log(response.data);
        setState({
          ...state,
          visible: true,
          snackbarMsg: response.data.msg,
          email: '',
          fullName: '',
          password: '',
          phone: '',
          loading: false,
        });
      } catch (e) {
        console.log(e);
        setState({
          ...state,
          visible: true,
          loading: false,
          password: '',
          snackbarMsg: 'Email already Registered !',
        });
      }
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Congratulations your account is registered') {
      navigation.navigate('Login');
    }
  };
  return (
    <ScrollView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} />
        </View>
      </View>
      <View style={{paddingHorizontal: 30}}>
        <Title style={styles.heading}>Create an account</Title>
        <Subheading style={{color: colors.primary}}>NAME</Subheading>
        <TextInput
          style={styles.formControl}
          value={state.fullName}
          error={state.nameError.error}
          onChangeText={(text) => setState({...state, fullName: text})}
        />
        <HelperText type="error" visible={true}>
          {state.nameError.helperText}
        </HelperText>
        <Subheading style={{color: colors.primary}}>EMAIL</Subheading>
        <TextInput
          style={styles.formControl}
          autoCompleteType="email"
          keyboardType="email-address"
          value={state.email}
          error={state.emailError.error}
          onChangeText={(text) => setState({...state, email: text})}
        />
        <HelperText type="error" visible={true}>
          {state.emailError.helperText}
        </HelperText>
        <Subheading style={{color: colors.primary}}>PASSWORD</Subheading>
        <TextInput
          style={styles.formControl}
          secureTextEntry
          selectTextOnFocus={true}
          value={state.password}
          error={state.passwordError.error}
          onChangeText={(text) => setState({...state, password: text})}
        />
        <HelperText type="error" visible={true}>
          {state.passwordError.helperText}
        </HelperText>
        <Subheading style={{color: colors.primary}}>PHONE NO.</Subheading>
        <TextInput
          style={styles.formControl}
          keyboardType="number-pad"
          maxLength={11}
          value={state.phone}
          error={state.phoneError.error}
          placeholder="03xxxxxxxxx"
          onChangeText={(text) => setState({...state, phone: text})}
        />
        <HelperText type="error" visible={true}>
          {state.phoneError.helperText}
        </HelperText>
        <View style={styles.bottomRow}>
          <Checkbox
            color="#6C3483"
            status={state.checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setState({...state, checked: !state.checked});
            }}
          />
          <Text style={styles.agree}>I accept </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Terms & Conditions')}>
            <Text style={styles.clickMe}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        {state.termsError.error ? (
          <HelperText type="error" visible={true}>
            For signing up you have to accept terms & conditions.
          </HelperText>
        ) : null}
        <Button
          style={styles.signupBtn}
          mode="contained"
          uppercase={false}
          onPress={() => signUp()}>
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
      <Spinner visible={state.loading} />
    </ScrollView>
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
    textAlign: 'center',
    marginVertical: 5,
    marginBottom: 20,
    color: PrimaryColor,
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
  },
  bottomRow: {
    flexDirection: 'row',
  },
  clickMe: {
    fontWeight: 'bold',
    paddingVertical: 8,
    color: PrimaryColor,
  },
  agree: {
    paddingVertical: 8,
  },
  signupBtn: {
    textTransform: 'lowercase',
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});

export default SignUp;
