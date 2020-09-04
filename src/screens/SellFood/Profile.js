import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  Button,
  Title,
  Subheading,
  Avatar,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import avatar from '../../assets/chef-avatar.jpg';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {SERVER_URL} from '../../../app.json';
import Spinner from 'react-native-loading-spinner-overlay';
import {setCurrentUser, logoutUser} from '../../redux/actions/auth';

const Profile = ({navigation, auth, logoutUser, setCurrentUser}) => {
  const {colors} = useTheme();

  const [user, setUser] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    address: '',
    image: '',
  });

  const [image, setImg] = useState('');

  const [state, setState] = useState({
    loading: false,
    visible: false,
    snackbarMsg: '',
  });

  useEffect(() => {
    setUser(auth.user);
    // console.log(auth.user);
  }, [auth.user]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      logoutUser();
      navigation.navigate('Starting Screen');
    } catch (e) {
      console.log(e);
    }
  };

  const sendImage = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      let data = {
        email: auth.user.email,
        image,
      };
      if (image) {
        // console.log(data);
        let res = await axios.post(SERVER_URL + '/auth/addimage', data);
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Image Added to Profile',
        });
        setCurrentUser({
          ...auth.user,
          image,
        });
      } else {
        setState({
          ...state,
          visible: true,
          snackbarMsg: 'Please upload an image',
        });
      }
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: "Error ! Can't add image",
      });
    }
  };

  const uploadImage = () => {
    // Open Image Library
    ImagePicker.showImagePicker({}, (res) => {
      setImg(res.data);
      // console.log(res.data);
      sendImage();
    });
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
  };

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
      <ScrollView style={styles.container}>
        <View style={styles.avatar}>
          {user.image === '' ||
          user.image === null ||
          user.image === undefined ? (
            <Avatar.Image size={150} source={avatar} />
          ) : (
            <Avatar.Image
              size={150}
              source={{uri: 'data:image/png;base64,' + user.image}}
            />
          )}

          <View style={styles.img}>
            <IconButton
              icon="camera"
              size={20}
              color="white"
              onPress={() => uploadImage()}
            />
          </View>
          <Button
            style={styles.logoutBtn}
            icon="logout"
            uppercase={false}
            size={25}
            onPress={() => logout()}>
            Logout
          </Button>
        </View>

        <Title style={{fontSize: 16, color: colors.primary}}>User Name</Title>
        <Subheading>{user.name}</Subheading>
        <Title style={{fontSize: 16, color: colors.primary}}>
          Email Address
        </Title>
        <Subheading>{user.email}</Subheading>
        <Title style={{fontSize: 16, color: colors.primary}}>Phone no.</Title>
        <Subheading>{user.phone}</Subheading>
        <Title style={{fontSize: 16, color: colors.primary}}>Address</Title>
        <Subheading>{user.address ? user.address.area : ''}</Subheading>
        <View style={styles.row}>
          <Subheading></Subheading>
          <TouchableOpacity onPress={() => navigation.navigate('Add Address')}>
            <Subheading
              style={{textDecorationLine: 'underline', color: colors.primary}}>
              Enter Address
            </Subheading>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          style={styles.loginBtn}
          uppercase={false}
          onPress={() => navigation.navigate('Update Password')}>
          Update Password
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
  avatar: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  img: {
    backgroundColor: '#6C3483',
    width: 40,
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    left: '30%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginBtn: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  heading: {
    marginVertical: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  logoutBtn: {
    marginTop: 15,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {logoutUser, setCurrentUser})(Profile);
