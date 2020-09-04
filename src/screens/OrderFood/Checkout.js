import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {
  Button,
  Title,
  Card,
  TextInput,
  HelperText,
  RadioButton,
  Dialog,
  Portal,
  Paragraph,
  Subheading,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {SERVER_URL} from '../../../app.json';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {clearCart} from '../../redux/actions/cart';

const Checkout = ({navigation, customer, mycart, clearCart, route}) => {
  const [amount, setAmount] = useState(0);
  const [state, setState] = useState({
    cash: false,
    easypaisa: false,
    paymentMethod: '',
    name: '',
    address: '',
    nameError: {
      error: false,
      helperText: '',
    },
    paymentError: {
      error: false,
      helperText: '',
    },
    areaError: {
      error: false,
      helperText: '',
    },
    phone: '',
    phoneError: {
      error: false,
      helperText: '',
    },
    loading: false,
    visible: false,
    dialogMsg: '',
    discount: '',
  });

  useEffect(() => {
    let p = 0;
    mycart.forEach((e) => {
      p = Number(p) + Number(e.price);
    });
    setAmount(p);
    // console.log(amount);
  }, [mycart]);

  useEffect(() => {
    // console.log(customer);
    setState({
      ...state,
      name: customer.user.name,
      phone: customer.user.phone,
      address: customer.user.address,
    });
  }, [customer]);

  useEffect(() => {
    console.log(route.params);
    if (route.params !== undefined) {
      setState({
        ...state,
        address: route.params.address,
      });
      if (route.params.discount) {
        let p = 0;
        mycart.forEach((e) => {
          p = Number(p) + Number(e.price);
        });
        p = p - p * (Number(route.params.discount) / 100);
        setAmount(Math.round(p));
      }
    }
  }, [route.params]);

  const hideDialog = () => {
    setState({
      ...state,
      visible: false,
    });
    if (state.dialogMsg === 'Your Order has been placed !') {
      navigation.navigate('Profile', {getorders: true});
    }
  };

  const confirmOrder = async () => {
    let nameError, areaError, paymentError, phoneError;
    if (state.name === '' || state.name.length < 6) {
      nameError = {
        error: true,
        helperText: 'Please enter valid name',
      };
    } else {
      nameError = {
        error: false,
        helperText: '',
      };
    }
    if (state.phone === '' || state.phone.length < 11) {
      phoneError = {
        error: true,
        helperText: 'Please enter valid mobile no.',
      };
    } else {
      phoneError = {
        error: false,
        helperText: '',
      };
    }
    if (state.address === '' || state.address === undefined) {
      areaError = {
        error: true,
        helperText: 'Please enter delivery address',
      };
    } else {
      areaError = {
        error: false,
        helperText: '',
      };
    }
    if (state.cash === false && state.easypaisa === false) {
      paymentError = {
        error: true,
        helperText: 'Please select Payment Method',
      };
    } else {
      paymentError = {
        error: false,
        helperText: '',
      };
    }
    setState({
      ...state,
      nameError,
      areaError,
      paymentError,
      phoneError,
    });
    if (
      nameError.error === false &&
      areaError.error === false &&
      paymentError.error === false &&
      phoneError.error === false
    ) {
      try {
        setState({
          ...state,
          loading: true,
          nameError: {
            error: false,
            helperText: '',
          },
          areaError: {
            error: false,
            helperText: '',
          },
          phoneError: {
            error: false,
            helperText: '',
          },
        });
        let data = {
          customer_id: customer.user._id,
          name: state.name,
          area: state.address,
          phone: state.phone,
          totalbill: amount,
          cart: mycart,
          paymentMethod: state.paymentMethod,
        };
        // console.log(data);
        const res = await axios.post(SERVER_URL + '/order/neworder', data);
        console.log(res.data);
        clearCart();
        if (state.paymentMethod === 'easypaisa') {
          setState({
            ...state,
            loading: false,
          });
          navigation.navigate('QR');
        } else {
          setState({
            ...state,
            loading: false,
            visible: true,
            dialogMsg: 'Your Order has been placed !',
          });
        }
      } catch (e) {
        console.log(e);
        setState({
          ...state,
          loading: false,
          visible: true,
          dialogMsg: "Can't place your order right now",
        });
      }
    }
  };

  const setpaymentMethod = (i) => {
    switch (i) {
      case 'cash':
        setState({
          ...state,
          easypaisa: false,
          cash: true,
          paymentMethod: 'cash',
        });
        break;
      case 'easypaisa':
        setState({
          ...state,
          easypaisa: true,
          cash: false,
          paymentMethod: 'easypaisa',
        });

        break;
    }
  };
  return (
    <ScrollView>
      <Spinner visible={state.loading} />
      <Portal>
        <Dialog visible={state.visible} onDismiss={hideDialog}>
          <Dialog.Title>{state.dialogMsg}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={{marginVertical: 20, textAlign: 'center'}}>
              Your Food is just few mins away !
            </Title>
            <TextInput
              label="Name"
              placeholder="Enter Your Name"
              mode="outlined"
              maxLength={16}
              value={state.name}
              onChangeText={(text) => setState({...state, name: text})}
              style={styles.formControl}
            />
            <HelperText type="error" visible={state.nameError.error}>
              {state.nameError.helperText}
            </HelperText>
            <TextInput
              label="Mobile no."
              mode="outlined"
              value={state.phone}
              maxLength={11}
              keyboardType="numeric"
              onChangeText={(text) => setState({...state, phone: text})}
              style={styles.formControl}
            />
            <HelperText type="error" visible={state.phoneError.error}>
              {state.phoneError.helperText}
            </HelperText>
            <TouchableOpacity onPress={() => navigation.navigate('Location')}>
              <TextInput
                label="Address"
                mode="outlined"
                value={state.address}
                disabled={true}
                error={state.areaError}
                style={styles.formControl}
              />
            </TouchableOpacity>
            <HelperText type="error" visible={state.areaError.error}>
              {state.areaError.helperText}
            </HelperText>

            <TextInput
              label="Total Bill"
              mode="outlined"
              value={amount.toString()}
              disabled={true}
              error={state.areaError}
              style={styles.formControl}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Coupon')}>
              <Subheading
                style={{
                  marginTop: 10,
                  alignSelf: 'flex-end',
                  textDecorationLine: 'underline',
                  color: '#6C3483',
                  marginRight: 10,
                }}>
                Apply Coupon
              </Subheading>
            </TouchableOpacity>
            <Title style={{fontSize: 18, marginTop: 15}}>Payment Method</Title>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                color="#6C3483"
                status={state.cash ? 'checked' : 'unchecked'}
                onPress={() => setpaymentMethod('cash')}
              />
              <Paragraph>Cash on delivery</Paragraph>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                color="#6C3483"
                status={state.easypaisa ? 'checked' : 'unchecked'}
                onPress={() => setpaymentMethod('easypaisa')}
              />
              <Paragraph>Easy Paisa</Paragraph>
            </View>
            <HelperText type="error" visible={state.paymentError.error}>
              {state.paymentError.helperText}
            </HelperText>

            <Button
              mode="contained"
              style={{marginHorizontal: 30, marginVertical: 20}}
              onPress={() => confirmOrder()}>
              Confirm Order
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  main: {
    textAlign: 'center',
    color: '#6C3483',
  },
  formControl: {
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  card: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#6C3483',
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => ({
  area: state.area,
  mycart: state.cart.items,
  customer: state.customer,
});

export default connect(mapStateToProps, {clearCart})(Checkout);
