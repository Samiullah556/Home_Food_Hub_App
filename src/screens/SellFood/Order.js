import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Title,
  TextInput,
  IconButton,
  Searchbar,
  Card,
  Avatar,
  Subheading,
  Paragraph,
  Snackbar,
} from 'react-native-paper';
import axios from 'axios';
import {SERVER_URL} from '../../../app.json';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Order = ({auth}) => {
  const [state, setState] = useState({
    active: false,
    loading: true,
    visible: false,
    snackbarMsg: '',
  });

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      let res = await axios.get(
        SERVER_URL + '/order/getorders?chef_id=' + auth.user._id,
      );
      setOrders(res.data);
      setState({
        ...state,
        loading: false,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Order Marked Completed') {
      setState({
        ...state,
        active: !state.active,
      });
    }
  };

  const markComplete = async (chef_id, orderId) => {
    console.log(chef_id, orderId);
    setState({
      ...state,
      loading: true,
    });
    try {
      let res = await axios.post(
        `${SERVER_URL}/order/changestatus?chef_id=${chef_id}&order_id=${orderId}`,
      );
      console.log(res.data);
      getAllOrders();
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: 'Order Marked Completed',
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
  };
  let total = 0;
  return (
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 15,
          }}>
          <Button
            mode={state.active ? 'contained' : 'outlined'}
            onPress={() =>
              setState({
                active: !state.active,
              })
            }>
            Completed
          </Button>
          <Button
            mode={state.active ? 'outlined' : 'contained'}
            onPress={() =>
              setState({
                active: !state.active,
              })
            }>
            In Progress
          </Button>
        </View>
        {state.active === false
          ? orders.map((item, index) => {
              if (item.inProgress === true) {
                return (
                  <Card key={index} style={styles.card}>
                    <Card.Content>
                      <View style={styles.row}>
                        <View>
                          <Subheading>{item.name}</Subheading>
                          <Paragraph style={styles.subheading}>
                            {item.description}
                          </Paragraph>
                        </View>

                        <View>
                          <Paragraph style={styles.subheading}>
                            Rs {item.price}
                          </Paragraph>
                          <Paragraph style={styles.subheading}>
                            {item.cuisine}
                          </Paragraph>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              markComplete(item.chef_id, item.orderId)
                            }>
                            <Icon name="check" color="#6C3483" size={25} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Paragraph
                        style={{
                          // textAlign: 'center',
                          marginTop: 10,
                          fontSize: 16,
                        }}>
                        Customer Details
                      </Paragraph>
                      <View style={styles.row}>
                        <Paragraph>Name : {item.customerName}</Paragraph>
                      </View>
                      <View style={styles.row}>
                        <Paragraph>
                          Delivery Address : {item.customeraddress}
                        </Paragraph>
                      </View>
                      <View style={styles.row}>
                        <Paragraph>
                          Contact no. : {item.customerContact}
                        </Paragraph>
                      </View>
                    </Card.Content>
                  </Card>
                );
              }
            })
          : orders.map((item, index) => {
              if (item.inProgress === false) {
                total = Number(total) + Number(item.price);
                return (
                  <Card key={index} style={styles.card}>
                    <Card.Content>
                      <View style={styles.row}>
                        <View>
                          <Subheading>{item.name}</Subheading>
                          <Paragraph style={styles.subheading}>
                            {item.description}
                          </Paragraph>
                        </View>

                        <View>
                          <Paragraph style={styles.subheading}>
                            Rs {item.price}
                          </Paragraph>
                          <Paragraph style={styles.subheading}>
                            {item.cuisine}
                          </Paragraph>
                        </View>
                      </View>
                      <Paragraph
                        style={{
                          // textAlign: 'center',
                          marginTop: 10,
                          fontSize: 16,
                        }}>
                        Customer Details
                      </Paragraph>
                      <View style={styles.row}>
                        <Paragraph>Name : {item.customerName}</Paragraph>
                      </View>
                      <View style={styles.row}>
                        <Paragraph>
                          Delivery Address : {item.customeraddress}
                        </Paragraph>
                      </View>
                      <View style={styles.row}>
                        <Paragraph>
                          Contact no. : {item.customerContact}
                        </Paragraph>
                      </View>
                    </Card.Content>
                  </Card>
                );
              }
            })}
        {state.active === true ? (
          <Subheading style={{textAlign: 'center', marginVertical: 10}}>
            Total Earnings : Rs {total}
          </Subheading>
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
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
  subheading: {
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(Order);
