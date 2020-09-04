import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Title,
  IconButton,
  Snackbar,
  Card,
  Avatar,
  Subheading,
  Paragraph,
} from 'react-native-paper';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {SERVER_URL} from '../../../app.json';
import axios from 'axios';

const Coupon = ({navigation}) => {
  const [coupons, setCoupons] = useState([]);
  const [state, setState] = useState({
    loading: true,
  });
  useEffect(() => {
    getAllCoupons();
  }, []);

  const getAllCoupons = async () => {
    try {
      let res = await axios.get(SERVER_URL + '/coupon/getall');
      // console.log(res.data);
      setCoupons(res.data);
      setState({
        loading: false,
      });
    } catch (e) {
      setState({
        loading: false,
      });
      console.log(e);
    }
  };

  const applyCoupon = (discount) => {
    navigation.navigate('Checkout', {discount});
  };

  return (
    <>
      <Spinner visible={state.loading} />

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#6C3483',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 10,
          }}>
          <Title style={{color: 'white'}}>Coupons Available</Title>
        </View>
        {coupons.length === 0 && state.loading === false ? (
          <Subheading style={{textAlign: 'center', marginTop: '50%'}}>
            No Coupons Available !
          </Subheading>
        ) : null}
        {coupons.map((item, index) => {
          return (
            <Card key={index} style={styles.card}>
              <Card.Content
                style={{
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Subheading style={{marginHorizontal: 15, marginBottom: 10}}>
                  Coupon # {item.coupon_no}
                </Subheading>
                <Subheading style={styles.badgeText}>
                  Discount : {item.discount}%
                </Subheading>
                <Text style={styles.badgeText}>
                  Valid Till : {item.expiry_date}
                </Text>
                <Button
                  mode="contained"
                  style={{marginTop: 10}}
                  onPress={() => applyCoupon(item.discount)}>
                  Apply Coupon
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
    flexDirection: 'row',
    backgroundColor: '#6C3483',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  card: {
    borderColor: '#6C3483',
    borderWidth: 2,
    marginHorizontal: 40,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginTop: 15,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Coupon);
