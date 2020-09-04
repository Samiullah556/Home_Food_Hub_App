import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
  HelperText,
  Subheading,
  TextInput,
  IconButton,
  Snackbar,
} from 'react-native-paper';
import {fieldValidate} from '../../utils/formValidation';
import ImagePicker from 'react-native-image-picker';
import {SERVER_URL} from '../../../app.json';
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from '@react-native-community/picker';

const NewDish = ({navigation, auth, route}) => {
  const {colors} = useTheme();

  useEffect(() => {
    if (route.params !== undefined) {
      const {name, description} = route.params;
      setState({
        ...state,
        name,
        description,
      });
    }
  }, [route.params]);

  const [state, setState] = useState({
    name: '',
    nameError: {
      error: false,
      helperText: '',
    },
    description: '',
    descriptionError: {
      error: false,
      helperText: '',
    },
    price: '',
    priceError: {
      error: false,
      helperText: '',
    },
    cuisine: 'Desi Food',
    category: 'BreakFast',
    image: {
      buffer: '',
      fileName: '',
      uri: '',
      size: '',
      type: '',
    },
    imageError: {
      error: false,
      helperText: '',
    },
    loading: false,
    visible: false,
    snackbarMsg: '',
  });
  const onDismissSnackBar = () => {
    setState({...state, visible: false});
    if (state.snackbarMsg === 'Dish Added for current Chef') {
      navigation.navigate('Dishes', {msg: 'fetchDishes'});
    }
  };

  const validateData = () => {
    let nameError = fieldValidate(state.name, 'name');
    let descriptionError = {};
    let imageError = {};
    let priceError = fieldValidate(state.price, 'code');

    if (state.description === '' || state.description.length < 6) {
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
    if (state.image.buffer === '') {
      imageError = {
        error: true,
        helperText: 'Please upload an Image',
      };
    } else {
      imageError = {
        error: false,
        helperText: '',
      };
    }
    if (!priceError.error) {
      if (Number(state.price) < 50) {
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
      imageError,
    });
    if (
      nameError.error ||
      descriptionError.error ||
      priceError.error ||
      imageError.error
    )
      return false;
    else return true;
  };

  const addDish = async () => {
    try {
      if (validateData()) {
        setState({
          ...state,
          loading: true,
        });

        let data = {
          name: state.name,
          chef_id: auth.user._id,
          chef_name: auth.user.name,
          description: state.description,
          price: state.price,
          cuisine: state.cuisine,
          category: state.category,
          image: state.image.buffer,
        };

        // console.log(data);

        let res = await axios.post(SERVER_URL + '/dish/newdish', data);
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'Dish Added for current Chef',
        });
      }
    } catch (e) {
      console.log(e);
      setState({
        ...state,
        loading: false,
        visible: true,
        snackbarMsg: "Error! Can'nt add dish right now",
      });
    }
  };

  const pickImage = () => {
    // Open Image Library
    ImagePicker.showImagePicker({}, (res) => {
      // console.log(res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setState({
          ...state,
          image: {
            buffer: res.data,
            fileName: res.fileName,
            uri: res.uri,
            size: res.fileSize,
            type: res.type,
          },
          imageError: false,
        });
      }
    });
  };

  return (
    <>
      <Spinner visible={state.loading} />
      <Snackbar
        visible={state.visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {state.snackbarMsg}
      </Snackbar>
      <ScrollView>
        <View style={styles.imgBtn}>
          <IconButton
            icon="image-plus"
            size={25}
            color="white"
            onPress={() => pickImage()}
          />
        </View>
        <Image
          style={styles.img}
          source={{uri: 'data:image/png;base64,' + state.image.buffer}}
        />
        <HelperText type="error" visible={state.imageError.error}>
          {state.imageError.helperText}
        </HelperText>
        <View style={styles.container}>
          <Subheading style={{color: colors.primary}}>Dish Name</Subheading>
          <TextInput
            underlineColor={colors.primary}
            value={state.name}
            style={styles.formControl}
            error={state.nameError.error}
            placeholder="Eg : Biryani"
            onChangeText={(text) => setState({...state, name: text})}
          />
          <HelperText type="error" visible={state.nameError.error}>
            {state.nameError.helperText}
          </HelperText>
          <Subheading style={{color: colors.primary}}>Discription</Subheading>
          <TextInput
            underlineColor={colors.primary}
            value={state.description}
            style={styles.formControl}
            error={state.descriptionError.error}
            placeholder="Eg : 250 gm plate"
            onChangeText={(text) => setState({...state, description: text})}
          />
          <HelperText type="error" visible={state.descriptionError.error}>
            {state.descriptionError.helperText}
          </HelperText>
          <Subheading style={{color: colors.primary}}>Price</Subheading>
          <TextInput
            underlineColor={colors.primary}
            keyboardType="numeric"
            value={state.price}
            style={styles.formControl}
            error={state.priceError.error}
            onChangeText={(text) => setState({...state, price: text})}
          />
          <HelperText type="error" visible={state.priceError.error}>
            {state.priceError.helperText}
          </HelperText>
          <Subheading style={{color: colors.primary}}>Cuisine</Subheading>
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={state.cuisine}
              style={styles.dropdown}
              pickerStyle={{borderBottomColor: 'red', borderBottomWidth: 1}}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, cuisine: itemValue})
              }>
              <Picker.Item label="Desi Food" value="Desi Food" />
              <Picker.Item label="Fast Food" value="Fast Food" />
              <Picker.Item label="Chinese Food" value="Chinese Food" />
              <Picker.Item label="Sea Food" value="Sea Food" />
              <Picker.Item label="BBQ" value="BBQ" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <Subheading style={{color: colors.primary}}>Category</Subheading>

          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={state.category}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) =>
                setState({...state, category: itemValue})
              }>
              <Picker.Item label="BreakFast" value="BreakFast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Diet Food" value="Diet Food" />
              <Picker.Item label="Bakery Item" value="Bakery Item" />
              <Picker.Item label="Desserts" value="Desserts" />
              <Picker.Item label="Hi Tea" value="Hi Tea" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <Button
            mode="contained"
            uppercase={false}
            style={{marginVertical: 20, marginHorizontal: 20}}
            onPress={() => addDish()}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
    // marginVertical: 10,
  },
  imgBtn: {
    backgroundColor: '#6C3483',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: 100,
    zIndex: 300,
    left: '45%',
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderBottomColor: 'red',
  },
  dropdownWrapper: {
    borderBottomColor: '#6C3483',
    borderBottomWidth: 1,
    opacity: 0.8,
  },
  img: {
    width: '100%',
    height: 260,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {})(NewDish);
