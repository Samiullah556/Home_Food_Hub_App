import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useTheme} from 'react-native-paper';
import {PrimaryColor} from '../../utils/formValidation';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {
  Button,
  Title,
  TextInput,
  Subheading,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import Logo from '../../assets/logo.png';
import {connect} from 'react-redux';
import {SERVER_URL} from '../../../app.json';
import {setCurrentUser} from '../../redux/actions/auth';
import Spinner from 'react-native-loading-spinner-overlay';

const Address = ({navigation, auth, setCurrentUser}) => {
  const [state, setState] = useState({
    city: 'Karachi',
    area: '',
    areaError: {
      error: false,
      helperText: '',
    },

    snackbarMsg: '',
    visible: false,
    loading: false,
    button: true,
  });

  useEffect(() => {
    let {user} = auth;
    if (user.address) {
      setState({
        ...state,
        area: user.address.area,
      });
    }
  }, [auth]);

  const validateForm = () => {
    let areaError = {};

    if (state.area === '' || state.area.length < 4) {
      areaError = {
        error: true,
        helperText: 'Must be 4 characters',
      };
    } else {
      areaError = {
        error: false,
        helperText: '',
      };
    }

    setState({
      ...state,
      areaError,
    });

    if (areaError.error) return false;
    else return true;
  };

  const addAddress = async () => {
    console.log(validateForm());
    if (validateForm()) {
      setState({
        ...state,
        loading: true,
      });
      let data = {
        email: auth.user.email,
        address: {
          city: state.city,
          area: state.area,
        },
      };
      try {
        const response = await axios.post(
          SERVER_URL + '/auth/addaddress',
          data,
        );
        console.log(response.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Address Updated to Profile',
        });
        setCurrentUser({
          ...auth.user,
          address: {city: 'Karachi', area: state.area},
        });
      } catch (e) {
        console.log(e);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Error Something went wrong !',
        });
      }
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Address Updated to Profile') {
      navigation.navigate('Dashboard');
    }
  };
  const {colors} = useTheme();

  return (
    <>
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
      <Spinner visible={state.loading} />
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Logo} />
          </View>
          <Title style={styles.heading}>Add Address</Title>
          <Subheading style={{color: colors.primary}}>City</Subheading>
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={state.cuisine}
              style={styles.dropdown}
              pickerStyle={{borderBottomColor: 'red', borderBottomWidth: 1}}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, cuisine: itemValue})
              }>
              <Picker.Item label="Karachi" value="Karachi" />
            </Picker>
          </View>

          <Subheading style={{color: colors.primary}}>Area</Subheading>
          <TextInput
            style={styles.formControl}
            value={state.area}
            error={state.areaError.error}
            onChangeText={(text) =>
              setState({...state, area: text, button: false})
            }
          />
          <HelperText type="error" visible={state.areaError.error}>
            {state.areaError.helperText}
          </HelperText>

          <Button
            style={styles.loginBtn}
            mode="contained"
            uppercase={false}
            disabled={state.button}
            onPress={() => addAddress()}>
            Submit
          </Button>
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
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
  },
  dropdownWrapper: {
    borderBottomColor: '#6C3483',
    borderBottomWidth: 1,
    opacity: 0.8,
    marginBottom: 10,
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

export default connect(mapStateToProps, {setCurrentUser})(Address);
