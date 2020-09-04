import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Button,
  Title,
  Subheading,
  Card,
  Snackbar,
  Avatar,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { SERVER_URL } from '../../../app.json';
import chefImage from '../../assets/chef-avatar.jpg';
import { Call, Text } from 'react-native-openanything';

const BookChef = ({ navigation, customer }) => {
  // console.log('customer:', customer);
  const [state, setState] = useState({
    loading: false,
    visible: false,
    snackbarMsg: '',
    fav: [],
  });

  const [chef, setChef] = useState([]);

  useEffect(() => {
    getAllChefs();
  }, []);

  const getAllChefs = async () => {
    console.log('getAllChefs call')
    setState({
      ...state,
      loading: true,
    });
    try {
      let res = await axios.get(SERVER_URL + '/auth/getallusers');
      // console.log('BookChef res:', res);
      let filtered = res.data.filter(
        (i) => i.email !== 'admin@homefoodhub.com',
      );
      setChef(filtered);

      setState({
        ...state,
        loading: false,
      });
    } catch (e) {
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: 'Network Error! Fail to fetch Chef(s)',
      });
      //   console.log(e);
    }
  };
  const onDismissSnackBar = () => {
    setState({ ...state, visible: false });
    if (state.snackbarMsg === 'You must login to book a chef !') {
      navigation.navigate('Profile');
    }
  };

  const bookChef = (currentDate, bookingDate, id, name) => {
    if (customer.loggedIn === false) {
      setState({
        ...state,
        visible: true,
        snackbarMsg: 'You must login to book a chef !',
      });
    } else {
      let dt = new Date(Number(bookingDate));
      if (Number(currentDate) > Number(bookingDate)) {
        navigation.navigate('Book a Chef', {
          id,
          name,
        });
      } else if (
        bookingDate === undefined ||
        bookingDate === null ||
        bookingDate === ''
      ) {
        navigation.navigate('Book a Chef', {
          id,
          name,
        });
      } else {
        setState({
          ...state,
          visible: true,
          snackbarMsg: 'Chef is booked till ' + dt.toLocaleDateString(),
        });
      }
    }
  };
  return (
    <>
      <Spinner visible={state.loading} />
      <Snackbar
        visible={state.visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {state.snackbarMsg}
      </Snackbar>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Title style={{ color: 'white' }}>Chef(s) Available</Title>
        </View>
        {chef.length === 0 && state.loading === false ? (
          <Subheading style={{ textAlign: 'center', marginTop: '50%' }}>
            No Chef(s) Available !
          </Subheading>
        ) : null}
        {chef.map((item, index) => {
          let date = new Date();
          let currentDate = date.setDate(date.getDate());
          let bookingDate = item.bookedTill;
          return (
            <Card key={index} style={styles.card}>
              <Card.Content
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                {item.image ? (
                  <Avatar.Image
                    size={60}
                    source={{ uri: 'data:image/png;base64,' + item.image }}
                  />
                ) : (
                    <Avatar.Image size={60} source={chefImage} />
                  )}
                <Subheading style={{ marginHorizontal: 15, marginBottom: 10 }}>
                  {item.name}
                </Subheading>
              </Card.Content>
              <Card.Content
                style={{
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Button
                  icon="phone"
                  size={35}
                  onPress={() =>
                    Call(item.phone)
                      .then((i) => console.log(i))
                      .catch((e) => {
                        alert("Can't Call right now !");
                        console.log(e);
                      })
                  }>
                  {item.phone}
                </Button>
                <Button
                  icon="android-messages"
                  uppercase={false}
                  // size={35}
                  onPress={() => {

                    console.log('chat with cook button pressed')
                    if (customer.loggedIn === false) {
                      console.log('customer not login')
                      navigation.navigate('Chat', {
                        chefId: item._id,
                        chefEmail: item.email,
                        chefName: item.name,
                      })
                    } else {
                      console.log('customer login')
                      navigation.navigate('Chat', {
                        chefId: item._id,
                        chefEmail: item.email,
                        chefName: item.name,
                        customerId: customer.user._id,
                        customerEmail: customer.user.email,
                        customerName: customer.user.name,
                      })
                    }
                  }}>
                  Msg Cook
                </Button>
              </Card.Content>
              <Card.Content
                style={{
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                }}>
                <Button
                  icon="food"
                  mode="contained"
                  uppercase={false}
                  onPress={() =>
                    navigation.navigate('Request Dish', {
                      id: item._id,
                      name: item.name,
                    })
                  }>
                  Request Dish
                </Button>
                <Button
                  icon="calendar"
                  mode="contained"
                  uppercase={false}
                  onPress={() =>
                    bookChef(currentDate, bookingDate, item._id, item.name)
                  }>
                  Book Chef
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    marginHorizontal: 15,
    shadowColor: '#00000029',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, {})(BookChef);
