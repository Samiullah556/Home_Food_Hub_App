import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import Logo from '../assets/logo.png';
import Spinner from 'react-native-loading-spinner-overlay';

const StartScreen = ({navigation, auth}) => {
  const [loading, setLoading] = useState(false);

  const sellFood = () => {
    setLoading(true);
    setTimeout(() => {
      if (auth.authenticated) {
        setLoading(false);
        navigation.navigate('Dashboard');
      } else {
        setLoading(false);
        navigation.navigate('Auth Stack');
      }
    }, 4000);
  };
  return (
    <>
      <Spinner visible={loading} />
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <Image
          source={Logo}
          style={{
            width: 250,
            height: 250,
            position: 'absolute',
            zIndex: 200,
            top: 30,
          }}
        />
        <Title
          style={{
            position: 'absolute',
            top: 300,
            fontSize: 30,
            color: 'white',
            backgroundColor: '#6C3483',
            padding: 10,
            borderRadius: 10,
          }}>
          Home Food Hub
        </Title>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 80,
            zIndex: 300,
          }}>
          <Button
            mode="contained"
            style={{width: 150, marginHorizontal: 8}}
            onPress={() => navigation.navigate('Order Food')}>
            Order Food
          </Button>
          <Button
            mode="contained"
            style={{width: 150, marginHorizontal: 8}}
            onPress={() => sellFood()}>
            Sell Food
          </Button>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(StartScreen);
