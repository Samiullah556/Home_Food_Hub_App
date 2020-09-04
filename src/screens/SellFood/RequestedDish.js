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

const RequestedDish = ({auth, navigation}) => {
  const [state, setState] = useState({
    active: false,
    loading: false,
    visible: false,
    snackbarMsg: '',
  });

  const [newDishes, setnewDishes] = useState([]);
  useEffect(() => {
    // console.log(auth.user.requestedDish);
    setnewDishes(auth.user.requestedDish);
  }, []);

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Order Marked Completed') {
      setState({
        ...state,
        active: !state.active,
      });
    }
  };

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
        {newDishes.map((item, index) => {
          return (
            <Card key={index} style={styles.card}>
              <Card.Title title={item.name} subtitle={item.description} />
              <Card.Content
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}></Card.Content>
              <Button
                style={{position: 'absolute', top: 22, right: 10}}
                uppercase={false}
                icon="plus"
                mode="contained"
                onPress={() =>
                  navigation.navigate('New Dish', {
                    name: item.name,
                    description: item.description,
                  })
                }>
                Add this dish
              </Button>
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
    height: '100%',
  },

  card: {
    marginHorizontal: 25,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 6,
    marginVertical: 15,
    borderColor: '#6C3483',
    borderRadius: 8,
    borderWidth: 2,
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

export default connect(mapStateToProps, {})(RequestedDish);
