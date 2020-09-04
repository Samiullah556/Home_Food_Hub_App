import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Card, Title, Paragraph, Subheading} from 'react-native-paper';
import {connect} from 'react-redux';
import {Call, Text} from 'react-native-openanything';

import axios from 'axios';
import { SERVER_URL } from '../../../app.json';

const Wallet = ({navigation,auth}) => {
    // console.log(auth.user);
  let dt = new Date(Number(auth.user.bookedTill));
  
  const [customer, setCustomer] = useState([]);

  const [state, setState] = useState({
    loading: false,
    visible: false,
    snackbarMsg: '',
});

useEffect(() => {
  async function fetchData() {
    await getCustomer();
  }
  fetchData();
}, []);

  const getCustomer = async () => {
    console.log('getCustomer call')
    console.log(SERVER_URL + '/auth/getcustomer?q=' + auth.user.bookedBy.customer_id);
    // let res = await axios.get(SERVER_URL + '/auth/getcustomer?q=' + auth.user.bookedBy.customer_id);
    // // console.log('res:', res);
    // customer = res.data;
    // // console.log('customer:', customer)
    // return customer;
    try {
    let res = await axios.get(SERVER_URL + '/auth/getcustomer?q=' + auth.user.bookedBy.customer_id);
    // console.log('res:', res)
    // console.log('customer:', res.data)
    setCustomer(res.data);
    setState({
        ...state,
        loading: false,
    });
    } catch (e) {
        setState({
            ...state,
            loading: false,
            visible: true,
            snackbarMsg: 'Network Error! Fail to fetch Customer',
        });
        //   console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Subheading style={{textAlign: 'center', marginVertical: 15}}>
        New Bookings
      </Subheading>
      {auth.user.bookedBy ? (
        <Card style={styles.card}>
          <Card.Content style={{flexDirection: 'row'}}>
            <Paragraph>Customer Name : {auth.user.bookedBy.name}</Paragraph>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Paragraph>Msg now</Paragraph>
            <Button
                  icon="android-messages"
                  uppercase={false}
                  // size={35}
                  onPress={() => {
                    console.log('chat with cook button pressed')
                      navigation.navigate('Chat', {
                        chefId: auth.user._id,
                        chefEmail: auth.user.email,
                        chefName: auth.user.name,
                        customerId: customer._id,
                        customerEmail: customer.email,
                        customerName: customer.name,
                      })
                  }}>
                  Chat with customer
                </Button>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Paragraph>Call now</Paragraph>
            <Button
              icon="phone"
              size={35}
              onPress={() =>
                Call(auth.user.bookedBy.phone)
                  .then((i) => console.log(i))
                  .catch((e) => {
                    alert("Can't Call right now !");
                    console.log(e);
                  })
              }>
              {auth.user.bookedBy.phone}
            </Button>
          </Card.Content>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Paragraph>Booked End Date : {dt.toLocaleDateString()}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Subheading style={{textAlign: 'center', marginTop: '50%'}}>
          No Bookings so far !
        </Subheading>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(Wallet);
