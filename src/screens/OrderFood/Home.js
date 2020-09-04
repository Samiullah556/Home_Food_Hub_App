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
  Snackbar,
  IconButton,
  Searchbar,
  Card,
  Avatar,
  Subheading,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import {SERVER_URL} from '../../../app.json';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {addFav} from '../../redux/actions/auth';
import chefImage from '../../assets/chef-avatar.jpg';

const Home = ({navigation, addFav, mycart, route}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [search, setSearch] = useState('');

  const [state, setState] = useState({
    loading: false,
    visible: false,
    snackbarMsg: '',
    fav: [],
  });

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getAllDishes();
  }, []);

  useEffect(() => {
    if (route.params !== undefined) {
      const {category, filterClear} = route.params;
      if (filterClear === true) {
        setFilteredProducts(products);
        setFlag(false);
      } else if (filterClear === false) {
        let f = [];
        f = products.filter(
          (i) =>
            i.category === category[0] ||
            i.category === category[1] ||
            i.category === category[2] ||
            i.category === category[3] ||
            i.category === category[4] ||
            i.category === category[5] ||
            i.category === category[6],
        );
        setFilteredProducts(f);
        if (f.length === 0) {
          setFlag(true);
        } else {
          setFlag(true);
        }
      }
      // console.log(f);
    }
  }, [route.params]);

  const getAllDishes = async () => {
    setState({
      ...state,
      loading: true,
    });
    try {
      let res = await axios.get(SERVER_URL + '/dish/getalldishes');
      // console.log(res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
      setState({
        ...state,
        loading: false,
      });
    } catch (e) {
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: 'Network Error! Fail to fetch Product(s)',
      });
      console.log(e);
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, visible: false});
  };

  const addToFavorite = (i) => {
    addFav(i);
    setState({
      ...state,
      visible: true,
      snackbarMsg: 'Added to favourites',
    });
  };
  const searchDish = (s) => {
    setSearch(s);
    let filteredProducts = products.filter((item) => {
      let filteredName = item.name.toLowerCase();
      return filteredName.indexOf(s.toLowerCase()) !== -1;
    });
    filteredProducts.length === 0 ? setFlag(true) : setFlag(false);
    setFilteredProducts(filteredProducts);
  };
  const removeFilter = () => {
    setFilteredProducts(products);
    setFlag(false);
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
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#6C3483',
          justifyContent: 'center',
          textAlign: 'center',
          paddingVertical: 5,
        }}>
        <IconButton
          icon="menu-open"
          size={25}
          color="white"
          style={{flex: 0.4}}
          onPress={() => navigation.navigate('Filter')}
        />
        <Searchbar
          style={{flex: 2}}
          placeholder="Search"
          onChangeText={(text) => searchDish(text)}
          value={search}
        />
        <IconButton
          icon="cart"
          style={{flex: 0.4}}
          size={25}
          color="white"
          onPress={() => navigation.navigate('My Cart')}
        />
        <View style={styles.circle}>
          <Text style={{color: 'black', fontSize: 12}}>{mycart.length}</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {products.length === 0 && state.loading === false ? (
          <Subheading style={{textAlign: 'center', marginTop: '50%'}}>
            No Dishes(s) Available !
          </Subheading>
        ) : null}
        {flag ? (
          <Subheading style={{textAlign: 'center', marginVertical: 20}}>
            No Result(s) Found !
          </Subheading>
        ) : null}
        {filteredProducts.length === 0 && state.loading === false ? (
          <Button
            icon="trash-can-outline"
            mode="text"
            onPress={() => removeFilter()}>
            Clear Filters
          </Button>
        ) : null}
        {filteredProducts.map((item, index) => {
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
                  <TouchableOpacity onPress={() => addToFavorite(item)}>
                    <Icon name="heart-outline" color="red" size={25} />
                  </TouchableOpacity>
                </View>
                <Card.Content>
                  <Subheading style={{marginTop: 10}}>{item.name}</Subheading>
                  <Paragraph style={{color: 'grey'}}>
                    {item.description}
                  </Paragraph>
                  <Paragraph style={{fontStyle: 'italic', fontSize: 15}}>
                    Rs {item.price}
                  </Paragraph>
                  <Paragraph style={{color: 'grey'}}>{item.cuisine}</Paragraph>
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
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    marginHorizontal: 15,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginVertical: 10,
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
  circle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 20,
    width: 20,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 300,
    right: 6,
    top: 2,
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
  mycart: state.cart.items,
});

export default connect(mapStateToProps, {addFav})(Home);
