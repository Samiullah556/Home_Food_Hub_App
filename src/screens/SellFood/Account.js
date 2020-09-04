import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
  HelperText,
  Avatar,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import {fieldValidate} from '../../utils/formValidation';
import avatar from '../../assets/chef-avatar.jpg';
const Account = ({navigation}) => {
  const [state, setState] = useState({
    userName: '',
    city: '',
    area: '',
    address: '',
    userNameError: {
      error: false,
      helperText: '',
    },
    cityError: {
      error: false,
      helperText: '',
    },
    areaError: {
      error: false,
      helperText: '',
    },
    addressError: {
      error: false,
      helperText: '',
    },
    snackbarMsg: '',
    visible: false,
    loading: false,
  });

  const validateForm = () => {
    let userNameError = fieldValidate(state.userName, 'name');
    let cityError = fieldValidate(state.city, 'name');
    let areaError = fieldValidate(state.area, 'name');
    let addressError = fieldValidate(state.address, 'name');
    setState({...state, userNameError, cityError, areaError, addressError});
    if (
      userNameError.error ||
      cityError.error ||
      areaError.error ||
      addressError.error
    ) {
      return true;
    } else {
      return false;
    }
  };

  const signIn = async () => {
    if (!validateForm()) {
      setState({
        ...state,
        loading: true,
      });
      //   try {
      //     const response = await axios.post(ROUTES.USER_LOGIN, formData);
      //     console.log(response.data);
      //     await AsyncStorage.setItem('token', response.data.result.token);
      //     setState({
      //       ...state,
      //       email: '',
      //       password: '',
      //       emailError: {error: false},
      //       passwordError: {error: false},
      //     });
      //   } catch (e) {
      //     console.log(e);
      //     setState({
      //       ...state,
      //       visible: true,
      //       // password : '',
      //       snackbarMsg: 'Incorrect Email (or) Password !',
      //     });
      //   }
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.heading}>Account</Title>
      <View style={styles.avatar}>
        <Avatar.Image size={150} source={avatar} />
        <View style={styles.img}>
          <IconButton
            icon="camera"
            size={20}
            color="white"
            onPress={() => console.log('Cmera btn')}
          />
        </View>
      </View>
      <TextInput
        style={styles.formControl}
        mode="outlined"
        label="User Name"
        value={state.userName}
        error={state.userNameError.error}
        onChangeText={(text) => setState({...state, userName: text})}
      />
      <HelperText type="error" visible={state.userNameError.error}>
        {state.userNameError.helperText}
      </HelperText>

      <TextInput
        style={styles.formControl}
        mode="outlined"
        label="City"
        error={state.cityError.error}
        value={state.city}
        onChangeText={(text) => setState({...state, city: text})}
      />
      <HelperText type="error" visible={state.cityError.error}>
        {state.cityError.helperText}
      </HelperText>
      <TextInput
        style={styles.formControl}
        mode="outlined"
        label="Area"
        error={state.areaError.error}
        value={state.area}
        onChangeText={(text) => setState({...state, area: text})}
      />
      <HelperText type="error" visible={state.areaError.error}>
        {state.areaError.helperText}
      </HelperText>
      <TextInput
        style={styles.formControl}
        mode="outlined"
        label="Address Line"
        error={state.addressError.error}
        value={state.address}
        onChangeText={(text) => setState({...state, address: text})}
      />
      <HelperText type="error" visible={state.addressError.error}>
        {state.addressError.helperText}
      </HelperText>

      <Button
        style={styles.loginBtn}
        mode="contained"
        loading={state.loading}
        onPress={() => signIn()}>
        Update Profile
      </Button>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  avatar: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  img: {
    backgroundColor: 'black',
    width: 40,
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    left: '30%',
  },

  heading: {
    marginVertical: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: 'white',
    height: 50,
  },
  loginBtn: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});

// const mapStateToProps = (state) => ({
//   currentUser: state.currentUser,
//   cart: state.cart,
// });

export default Account;
