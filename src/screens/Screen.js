import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Title,
  Divider,
  IconButton,
  Subheading,
  Avatar,
} from 'react-native-paper';
import {connect} from 'react-redux';

const Screen = ({navigation, auth}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(auth.user);
  }, [auth.authenticated]);

  return (
    <ScrollView style={styles.loginView}>
      <Title style={styles.heading2}>
        For Selling your homemade Food, you must have to login
      </Title>
      <Button
        style={styles.loginBtn}
        labelStyle={{fontSize: 13}}
        mode="contained"
        uppercase={false}
        onPress={() => navigation.navigate('Auth Stack')}>
        Login
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: '45%',
    backgroundColor: 'white',
  },
  heading2: {
    marginVertical: 30,
    color: 'grey',
    fontSize: 16,
    textAlign: 'center',
  },
  loginBtn: {
    borderRadius: 10,
    marginHorizontal: 15,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(Screen);
