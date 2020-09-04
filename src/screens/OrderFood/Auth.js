import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Button,
  Title,
  Card,
  Paragraph,
  Subheading,
  Snackbar,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {removeCustomer} from '../../redux/actions/customer';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {SERVER_URL} from '../../../app.json';
import Spinner from 'react-native-loading-spinner-overlay';

const Auth = ({navigation, customer, removeCustomer, route}) => {
  // console.log(customer);
  const [orders, setOrders] = useState([]);

  const [state, setState] = useState({
    visible: false,
    snackbarMsg: '',
    loading: true,
  });

  useEffect(() => {
    if (customer.loggedIn === true) getAllOrders();
  }, [customer.loggedIn, route.params]);

  const getAllOrders = async () => {
    const {_id} = customer.user;
    try {
      const res = await axios.get(
        SERVER_URL + '/order/getorders?customer_id=' + _id,
      );
      setState({
        ...state,
        loading: false,
      });
      setOrders(res.data);
      // console.log(res.data);
    } catch (e) {
      console.log(e);
      setState({
        visible: true,
        snackbarMsg: 'Failed to fetch order history !',
        loading: false,
      });
    }
  };

  const logout = () => {
    removeCustomer();
    AsyncStorage.removeItem('customer');
  };

  const onDismissSnackBar = () => {
    setState({snackbarMsg: '', visible: false});
  };

  return customer.loggedIn === false ? (
    <ScrollView style={styles.loginView}>
      <Title style={styles.heading2}>For Profile, you must have to login</Title>
      <Button
        style={styles.loginBtn}
        labelStyle={{fontSize: 13}}
        mode="contained"
        uppercase={false}
        onPress={() => navigation.navigate('Customer Stack')}>
        Login
      </Button>
    </ScrollView>
  ) : (
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
        <View style={styles.header}>
          <Title style={{color: 'white'}}>Order History</Title>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Title style={{fontSize: 16}}>Hello, {customer.user.name}</Title>
          <Button
            style={styles.logoutBtn}
            icon="logout"
            uppercase={false}
            size={25}
            onPress={() => logout()}>
            Logout
          </Button>
        </View>
        {orders.length === 0 && state.loading === false ? (
          <Subheading style={{marginTop: '55%', textAlign: 'center'}}>
            Your Order History is Empty
          </Subheading>
        ) : (
          orders.map((item, index) => {
            return (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Subheading>{item.cart[0].name}</Subheading>
                  <Paragraph>{item.cart[0].description}</Paragraph>
                  <Subheading style={{fontStyle: 'italic'}}>
                    Rs. {item.cart[0].price}
                  </Subheading>
                  <Paragraph>{item.cart[0].cuisine}</Paragraph>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Title
                      style={{
                        fontSize: 16,
                      }}>
                      Chef : {item.cart[0].chef_name}
                    </Title>
                    {item.cart[0].inProgress ? (
                      <Paragraph style={{color: 'grey'}}>In Progress</Paragraph>
                    ) : (
                      <Paragraph style={{color: 'green'}}>Completed</Paragraph>
                    )}
                  </View>
                </Card.Content>
              </Card>
            );
          })
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6C3483',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  heading2: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginView: {
    paddingHorizontal: 50,
    paddingTop: '50%',
    backgroundColor: 'white',
  },
  card: {
    marginHorizontal: 15,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 6,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, {removeCustomer})(Auth);
