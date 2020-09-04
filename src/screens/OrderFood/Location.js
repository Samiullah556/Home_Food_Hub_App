import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import {
  Button,
  Title,
  TextInput,
  IconButton,
  Searchbar,
  Card,
  Avatar,
  HelperText,
  Paragraph,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {addCustomer} from '../../redux/actions/customer';
const Location = ({navigation, mycart, customer}) => {
  const [state, setState] = useState({
    city: 'Karachi',
    area: customer.user ? customer.user.address : '',
    cityError: false,
    areaError: false,
  });

  const AddLocation = () => {
    if (state.area === '' || state.area.length < 6) {
      setState({
        ...state,
        areaError: true,
      });
    } else {
      setState({
        ...state,
        areaError: false,
      });
      let user = customer.user;
      user.address = state.area;
      addCustomer(user);
      if (mycart.length > 0) {
        navigation.navigate('Checkout', {address: state.area});
      } else {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{marginVertical: 20, textAlign: 'center'}}>
            Welcome, Where to deliver ?
          </Title>
          <TextInput
            label="City"
            mode="outlined"
            disabled={true}
            value={state.city}
            style={{
              backgroundColor: 'white',
              marginBottom: 20,
              marginHorizontal: 10,
            }}
          />
          <TextInput
            placeholder="Area"
            mode="outlined"
            value={state.area}
            onChangeText={(text) => setState({...state, area: text})}
            error={state.areaError}
            style={{
              backgroundColor: 'white',
              marginBottom: 20,
              marginHorizontal: 10,
            }}
          />
          <HelperText type="error" visible={state.areaError}>
            Enter a valid address
          </HelperText>
          <Button
            mode="contained"
            style={{marginHorizontal: 30, marginVertical: 20}}
            onPress={() => AddLocation()}>
            Add Address
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  card: {
    borderWidth: 2,
    borderColor: '#6C3483',
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => ({
  mycart: state.cart.items,
  customer: state.customer,
});

export default connect(mapStateToProps, {addCustomer})(Location);
