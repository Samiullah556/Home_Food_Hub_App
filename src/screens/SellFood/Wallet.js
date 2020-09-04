import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const Wallet = ({navigation: {navigate}}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigate('Order History')}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Icon name="md-paper" color="#6C3483" size={25} />
            <Title style={styles.title}>Order History</Title>
            <Icon name="ios-arrow-forward" color="black" size={20} />
          </View>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('New Dish Requests')}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Icon name="ios-calendar" color="#6C3483" size={25} />
            <Title style={styles.title}>New Dish Requests</Title>
            <Icon name="ios-arrow-forward" color="black" size={20} />
          </View>
        </Card>
      </TouchableOpacity>
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
    marginTop: 15,
    marginBottom: 5,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Wallet;
