import React, {useEffect, useState, Fragment} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Button,
  Title,
  Divider,
  IconButton,
  Subheading,
  HelperText,
  Snackbar,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {removeFromCart} from '../../redux/actions/cart';

const MyCart = ({navigation: {navigate}, mycart, removeFromCart, customer}) => {
  // console.log(mycart);
  const [cart, setCart] = useState([]);
  const [state, setState] = useState({
    visible: false,
    snackbarMsg: '',
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setCart(mycart);
    let p = 0;
    mycart.forEach((e) => {
      p = Number(p) + Number(e.price);
    });
    // console.log(p);
    setAmount(p);
  }, [mycart]);

  const deleteItem = (i) => {
    removeFromCart(i);
    setState({snackbarMsg: 'Item removed from cart', visible: true});
  };
  const onDismissSnackBar = () => {
    setState({snackbarMsg: '', visible: false});
  };

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
      <ScrollView style={styles.container}>
        <View style={styles.rowView}>
          <Title style={[styles.heading, {flex: 0.5}]}>Name</Title>
          <Title style={[styles.heading, {flex: 0.39}]}>Price</Title>
        </View>
        {cart.map((item, index) => {
          return (
            <Fragment key={index}>
              <Divider />
              <View style={styles.row}>
                <Subheading style={[styles.subheading, {flex: 0.5}]}>
                  {item.name}
                </Subheading>
                <Subheading style={styles.subheading}>{item.price}</Subheading>
                <IconButton
                  icon="delete-outline"
                  size={20}
                  onPress={() => deleteItem(item)}
                />
              </View>
              <Divider />
            </Fragment>
          );
        })}
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Title style={[styles.heading]}>Subtotal : </Title>
          <Title style={[styles.heading]}>Rs {amount}</Title>
        </View>
        <Button
          icon="check-all"
          mode="contained"
          disabled={customer.loggedIn === false ? true : false}
          onPress={() => {
            if (mycart.length === 0) {
              alert('Your Cart is Empty !');
            } else {
              navigate('Checkout');
            }
          }}>
          Checkout
        </Button>
        {customer.loggedIn === false ? (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <HelperText type="error" style={{fontSize: 14}} visible={true}>
              You must Login to Checkout !
            </HelperText>
            <TouchableOpacity onPress={() => navigate('Customer Stack')}>
              <Subheading
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  color: 'grey',
                }}>
                Click here to Login
              </Subheading>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 16,
  },
  subheading: {
    color: 'grey',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: 140,
  },
});

const mapStateToProps = (state) => ({
  mycart: state.cart.items,
  customer: state.customer,
});

export default connect(mapStateToProps, {removeFromCart})(MyCart);
