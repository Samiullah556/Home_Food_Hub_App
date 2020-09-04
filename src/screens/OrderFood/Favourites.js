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
import chefImage from '../../assets/chef-avatar.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteFav} from '../../redux/actions/auth';
import Spinner from 'react-native-loading-spinner-overlay';

const Favourites = ({navigation, favourites, deleteFav}) => {
  const [fav, setFav] = useState([]);
  const [state, setState] = useState({
    loading: true,
    visible: false,
    snackbarMsg: '',
  });
  useEffect(() => {
    // console.log(favourites);
    setFav(favourites);
    setState({
      ...state,
      loading: false,
    });
  }, [favourites]);

  const removeFav = (id) => {
    deleteFav(id);
    setState({
      ...state,
      visible: true,
      snackbarMsg: 'Dish removed from Favourites',
    });
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
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
      <ScrollView>
        <View style={styles.container}>
          <Title style={{color: 'white'}}>Favourites</Title>
        </View>
        {fav.length === 0 ? (
          <Subheading style={{textAlign: 'center', marginTop: '50%'}}>
            No Dishes(s) in your favourite list
          </Subheading>
        ) : null}
        {fav.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('View Food', item)}>
              <Card style={styles.card}>
                <Card.Content
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  {item.chef_image ? (
                    <Avatar.Image
                      size={60}
                      source={{uri: 'data:image/png;base64,' + item.chef_image}}
                    />
                  ) : (
                    <Avatar.Image size={60} source={chefImage} />
                  )}

                  <Subheading style={{marginHorizontal: 15, marginBottom: 10}}>
                    {item.chef_name}
                  </Subheading>
                </Card.Content>
                <Card.Cover
                  source={{uri: 'data:image/png;base64,' + item.image}}
                />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.category}</Text>
                </View>
                <View style={styles.heartContainer}>
                  <TouchableOpacity onPress={() => removeFav(item._id)}>
                    <Icon name="trash" color="red" size={22} />
                  </TouchableOpacity>
                </View>
                <Card.Content
                  style={{
                    flexDirection: 'row',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{marginTop: 10}}>
                    <Subheading style={{marginVertical: 0}}>
                      {item.name}
                    </Subheading>
                    <Paragraph style={{marginVertical: 0, color: 'grey'}}>
                      {item.description}
                    </Paragraph>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Paragraph style={{marginVertical: 0, color: 'grey'}}>
                      Rs {item.price}
                    </Paragraph>
                    <Paragraph style={{marginVertical: 0, color: 'grey'}}>
                      {item.cuisine}
                    </Paragraph>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
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
    marginHorizontal: 15,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginTop: 15,
  },
  badge: {
    position: 'absolute',
    zIndex: 300,
    right: 0,
    top: 86,
    backgroundColor: 'black',
    width: 130,
    padding: 5,
  },

  heartContainer: {
    position: 'absolute',
    zIndex: 300,
    top: 30,
    right: 20,
  },

  badgeText: {textAlign: 'center', color: 'white'},
});

const mapStateToProps = (state) => ({
  favourites: state.fav.items,
});

export default connect(mapStateToProps, {deleteFav})(Favourites);
