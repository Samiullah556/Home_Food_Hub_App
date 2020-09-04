import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Subheading,
  Button,
  IconButton,
  Title,
  Paragraph,
  Snackbar,
  Card,
  Avatar,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions/cart';
import chefImage from '../../assets/chef-avatar.jpg';

const ViewFood = ({navigation, route, addToCart}) => {
  const [snackbar, setSnackbar] = useState(false);
  // console.log(route.params);
  const [item, setItem] = useState(route.params);
  const onDismissSnackBar = () => {
    setSnackbar(false);
    navigation.navigate('Home');
  };

  // const changeImage = (index) => {
  //   setState({
  //     ...state,
  //     currentImage: index,
  //   });
  // };
  // const swipeRight = () => {
  //   if (state.currentImage === state.images.length - 1) {
  //     setState({
  //       ...state,
  //       currentImage: 0,
  //     });
  //   } else {
  //     setState({
  //       ...state,
  //       currentImage: state.currentImage + 1,
  //     });
  //   }
  // };
  // const swipeLeft = () => {
  //   if (state.currentImage === 0) {
  //     setState({
  //       ...state,
  //       currentImage: state.images.length - 1,
  //     });
  //   } else {
  //     setState({
  //       ...state,
  //       currentImage: state.currentImage - 1,
  //     });
  //   }
  // };

  const addCart = () => {
    // console.log(route.params);
    const {
      category,
      chef_id,
      chef_name,
      cuisine,
      description,
      name,
      price,
      _id,
    } = route.params;
    let cartData = {
      name,
      price,
      description,
      category,
      cuisine,
      _id,
      chef_id,
      chef_name,
    };
    addToCart(cartData);
    setSnackbar(true);
  };
  return (
    <>
      <Snackbar
        duration={1000}
        visible={snackbar}
        onDismiss={onDismissSnackBar}>
        Product added to Cart
      </Snackbar>
      <ScrollView style={styles.container}>
        <View>
          {/* <IconButton
              style={styles.rightArrow}
              icon="chevron-right"
              size={35}
              color="white"
              onPress={() => swipeRight()}
            />
            <IconButton
              style={styles.leftArrow}
              icon="chevron-left"
              size={35}
              color="white"
              onPress={() => swipeLeft()}
            /> */}
          <Image
            source={{uri: 'data:image/png;base64,' + item.image}}
            style={styles.img}
          />
        </View>
        <View style={styles.box}>
          <Card.Content
            style={{
              flexDirection: 'row',
              textAlign: 'center',
              paddingHorizontal: 0,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item.chef_image ? (
                <Avatar.Image
                  size={60}
                  source={{uri: 'data:image/png;base64,' + item.chef_image}}
                />
              ) : (
                <Avatar.Image size={60} source={chefImage} />
              )}
              <Subheading style={{marginHorizontal: 10}}>
                {item.chef_name}
              </Subheading>
            </View>
          </Card.Content>
          <Title>{item.name}</Title>
          <Title style={{fontSize: 16}}>Price Rs {item.price}</Title>
          <Paragraph style={styles.para}>{item.description}</Paragraph>
          <Subheading>Category : {item.category}</Subheading>
          <Subheading>Cuisine : {item.cuisine}</Subheading>

          <Button
            icon="plus"
            style={styles.btn}
            mode="contained"
            onPress={() => addCart()}>
            Add to basket
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  box: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  btn: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    zIndex: 200,
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: 220,
  },
  imgIcon: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  imgRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  para: {
    color: 'grey',
    fontSize: 15,
  },
  heading: {
    marginVertical: 5,
    fontSize: 19,
  },
  btn: {
    marginTop: 10,
  },
  rightArrow: {
    position: 'absolute',
    zIndex: 200,
    top: '35%',
    right: 0,
  },
  leftArrow: {
    position: 'absolute',
    zIndex: 200,
    top: '35%',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {addToCart})(ViewFood);
