import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';
import {
  Button,
  Title,
  Subheading,
  HelperText,
  TextInput,
  Snackbar,
  Dialog,
  Portal,
  Card,
  Paragraph,
  Divider,
} from 'react-native-paper';
import {SERVER_URL} from '../../../app.json';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fieldValidate} from '../../utils/formValidation';

const Dishes = ({navigation, auth, route}) => {
  const [dish, setDish] = useState([]);

  const [singleDish, setSingleDish] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [state, setState] = useState({
    nameError: {
      error: false,
      helperText: '',
    },
    priceError: {
      error: false,
      helperText: '',
    },
    descriptionError: {
      error: false,
      helperText: '',
    },
    loading: true,
    visible: false,
    visibleEdit: false,
    id: '',
    snackbarMsg: '',
    snackbar: false,
  });
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Starting Screen');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );
  useEffect(() => {
    // console.log(route.params);
    getAllDishes();
  }, [route.params]);

  const getAllDishes = async () => {
    // console.log(auth.user._id);
    setState({
      ...state,
      loading: true,
    });
    try {
      let res = await axios.get(
        SERVER_URL + '/dish/getdishes?chef_id=' + auth.user._id,
      );
      // console.log(res.data);
      setState({
        ...state,
        loading: false,
        snackbarMsg: '',
        snackbar: false,
        visibleEdit: false,
      });
      setDish(res.data);
    } catch (e) {
      setState({
        ...state,
        loading: false,
        snackbar: true,
        snackbarMsg: 'Fail to fetch your Dishes',
      });
      console.log(e);
    }
  };

  const deleteDish = async () => {
    setState({
      ...state,
      loading: true,
      visible: false,
    });
    try {
      // console.log(state.id, 'delete dish');
      const res = await axios.delete(
        SERVER_URL + '/dish/removedish?q=' + state.id,
      );
      // console.log(res.data);
      setState({
        ...state,
        loading: false,
        snackbar: true,
        visible: false,
        snackbarMsg: 'Dish Deleted Successfully',
      });
      let filteredDishes = dish.filter((d) => d._id !== state.id);
      // console.log(filteredDishes);
      setDish(filteredDishes);
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        loading: false,
        snackbar: true,
        visible: false,
        snackbarMsg: "Error ! Can't delete dish",
      });
    }
  };

  const editDish = async () => {
    let nameError = fieldValidate(singleDish.name, 'name');
    let descriptionError = {};
    let priceError = fieldValidate(Number(singleDish.price), 'code');

    if (singleDish.description === '' || singleDish.description.length < 6) {
      descriptionError = {
        error: true,
        helperText: 'Description must contain atleast 6 characters',
      };
    } else {
      descriptionError = {
        error: false,
        helperText: '',
      };
    }
    if (!priceError.error) {
      if (Number(singleDish.price) < 50) {
        priceError = {
          error: true,
          helperText: 'Price must be greater than 50',
        };
      } else {
        priceError = {
          error: false,
          helperText: '',
        };
      }
    }
    setState({
      ...state,
      nameError,
      descriptionError,
      priceError,
    });
    if (
      nameError.error === false &&
      descriptionError.error === false &&
      priceError.error === false
    ) {
      setState({
        ...state,
        loading: true,
        visibleEdit: false,
      });
      try {
        let data = {
          name: singleDish.name,
          price: singleDish.price,
          description: singleDish.description,
          cuisine: singleDish.cuisine,
        };
        // console.log('Call Edit dish Api', singleDish);
        const res = await axios.post(
          SERVER_URL + '/dish/editdish?q=' + singleDish._id,
          data,
        );
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          snackbar: true,
          visible: false,
          visibleEdit: false,
          snackbarMsg: 'Dish Edited !',
        });
        getAllDishes();
      } catch (e) {
        setState({
          ...state,
          loading: false,
          snackbar: true,
          visible: false,
          visibleEdit: false,
          snackbarMsg: "Error ! Can't Edit dish",
        });
        console.log(e);
      }
    }
  };

  const onDismissSnackBar = () => {
    setState({...state, snackbar: false});
  };
  const showDialog = (id) => {
    setState({
      ...state,
      visible: true,
      id,
    });
  };
  const showDialogEdit = (item) => {
    setState({
      ...state,
      visibleEdit: true,
    });
    setSingleDish(item);
  };

  const hideDialog = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const hideDialogEdit = () => {
    setState({
      ...state,
      visibleEdit: false,
    });
  };

  return (
    <>
      <Snackbar
        visible={state.snackbar}
        onDismiss={onDismissSnackBar}
        duration={1000}>
        {state.snackbarMsg}
      </Snackbar>
      <ScrollView style={styles.container}>
        <Portal>
          <Dialog visible={state.visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure want to delete this dish ?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={deleteDish}>Confirm</Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={state.visibleEdit} onDismiss={hideDialogEdit}>
            <Dialog.Title>Edit Dish</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Name"
                mode="outlined"
                value={singleDish.name}
                onChangeText={(text) =>
                  setSingleDish({
                    ...singleDish,
                    name: text,
                  })
                }
                style={styles.formControl}
              />
              <HelperText type="error" visible={state.nameError.error}>
                {state.nameError.helperText}
              </HelperText>
              <TextInput
                label="Price"
                keyboardType="numeric"
                mode="outlined"
                value={singleDish.price}
                onChangeText={(text) =>
                  setSingleDish({
                    ...singleDish,
                    price: text,
                  })
                }
                style={styles.formControl}
              />
              <HelperText type="error" visible={state.priceError.error}>
                {state.priceError.helperText}
              </HelperText>
              <TextInput
                label="Description"
                mode="outlined"
                value={singleDish.description}
                onChangeText={(text) =>
                  setSingleDish({
                    ...singleDish,
                    description: text,
                  })
                }
                style={styles.formControl}
              />
              <HelperText type="error" visible={state.descriptionError.error}>
                {state.descriptionError.helperText}
              </HelperText>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={editDish}>Confirm</Button>
              <Button onPress={hideDialogEdit}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Spinner visible={state.loading} />
        <Button
          mode="contained"
          style={styles.loginBtn}
          uppercase={false}
          icon="plus"
          onPress={() => navigation.navigate('New Dish')}>
          Add New Dish
        </Button>
        {dish.length === 0 && state.loading === false ? (
          <Subheading style={styles.text}>No dish uploaded yet !</Subheading>
        ) : null}

        {dish.map((item, index) => {
          return (
            <Card key={index} style={styles.card}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => showDialog(item._id)}>
                  <Icon name="delete-forever" color="red" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => showDialogEdit(item)}>
                  <Icon name="edit" color="white" size={25} />
                </TouchableOpacity>
                <Image
                  style={styles.img}
                  source={{uri: 'data:image/png;base64,' + item.image}}
                />
                <View style={{flexShrink: 1}}>
                  <View style={styles.infoRow}>
                    <Paragraph style={{marginLeft: 5, fontSize: 15}}>
                      {item.name}
                    </Paragraph>
                    <Paragraph style={styles.info}>Rs {item.price}</Paragraph>
                  </View>
                  <Divider />
                  <Paragraph style={styles.info}>{item.description}</Paragraph>
                  <Divider />
                  <View style={styles.infoRow}>
                    <Paragraph style={styles.info}>Category</Paragraph>
                    <Paragraph style={styles.info}>Cuisine</Paragraph>
                  </View>
                  <View style={styles.infoRow}>
                    <Paragraph style={styles.info}>{item.category}</Paragraph>
                    <Paragraph style={styles.info}>{item.cuisine}</Paragraph>
                  </View>
                </View>
              </View>
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
  },

  loginBtn: {
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 20,
  },

  text: {
    marginTop: '50%',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: 140,
    height: 150,
  },
  info: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: 'white',
    height: 50,
  },
  deleteBtn: {
    position: 'absolute',
    zIndex: 300,
    top: 5,
    left: 3,
  },
  editBtn: {
    position: 'absolute',
    zIndex: 300,
    top: 5,
    left: 110,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(Dishes);
