import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  Title,
  Subheading,
  Card,
  Snackbar,
  Button,
  HelperText,
  TextInput,
  IconButton,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-community/picker';
import { fieldValidate } from '../../utils/formValidation';

import axios from 'axios';
import { SERVER_URL } from '../../../app.json';

const RequestDish = ({ navigation, route }) => {
  const { colors } = useTheme();
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
    cuisine: 'Desi Food',
    category: 'BreakFast',
    loading: false,
    visible: false,
    snackbarMsg: '',
  });

  useEffect(() => { }, []);

  const newDish = async () => {
    // console.log(route.params.id);
    let nameError = fieldValidate(state.name, 'name');
    let descriptionError = {};
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
    setState({
      ...state,
      nameError,
      descriptionError,
    });

    if (nameError.error === false && descriptionError.error === false) {
      setState({
        ...state,
        loading: true,
      });
      try {
        let { name, description, cuisine, category } = state;
        let data = {
          name,
          description,
          cuisine,
          category,
        };
        console.log(data);
        let res = await axios.post(
          SERVER_URL + '/dish/requestdish?q=' + route.params.id,
          data,
        );
        // console.log(res.data);
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: 'New dish is requested to the Chef !',
        });
      } catch (e) {
        setState({
          ...state,
          loading: false,
          visible: true,
          snackbarMsg: "Can't request new dish right now !",
        });
        console.log(e);
      }
    }
  };
  const onDismissSnackBar = () => {
    setState({ ...state, visible: false });
    if (state.snackbarMsg === 'New dish is requested to the Chef !') {
      navigation.navigate('Home');
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
        <View
          style={{
            borderColor: 'purple',
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Subheading style={{ color: colors.primary }}>
              Request to Chef :
            </Subheading>
            <Subheading> {route.params.name}</Subheading>
          </View>
          <Subheading style={{ color: colors.primary }}>Dish Name</Subheading>
          <TextInput
            underlineColor={colors.primary}
            value={state.name}
            style={styles.formControl}
            error={state.nameError.error}
            placeholder="Eg : Biryani"
            onChangeText={(text) => setState({ ...state, name: text })}
          />
          <HelperText type="error" visible={state.nameError.error}>
            {state.nameError.helperText}
          </HelperText>
          <Subheading style={{ color: colors.primary }}>Discription</Subheading>
          <TextInput
            underlineColor={colors.primary}
            value={state.description}
            style={styles.formControl}
            error={state.descriptionError.error}
            placeholder="Eg : 250 gm plate"
            onChangeText={(text) => setState({ ...state, description: text })}
          />
          <HelperText type="error" visible={state.descriptionError.error}>
            {state.descriptionError.helperText}
          </HelperText>

          <Subheading style={{ color: colors.primary }}>Cuisine</Subheading>
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={state.cuisine}
              style={styles.dropdown}
              pickerStyle={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
              onValueChange={(itemValue, itemIndex) =>
                setState({ ...state, cuisine: itemValue })
              }>
              <Picker.Item label="Desi Food" value="Desi Food" />
              <Picker.Item label="Fast Food" value="Fast Food" />
              <Picker.Item label="Chinese Food" value="Chinese Food" />
              <Picker.Item label="Sea Food" value="Sea Food" />
              <Picker.Item label="BBQ" value="BBQ" />
            </Picker>
          </View>
          <Subheading style={{ color: colors.primary }}>Category</Subheading>

          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={state.category}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) =>
                setState({ ...state, category: itemValue })
              }>
              <Picker.Item label="BreakFast" value="BreakFast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Diet Food" value="Diet Food" />
              <Picker.Item label="Bakery Item" value="Bakery Item" />
              <Picker.Item label="Desserts" value="Desserts" />
              <Picker.Item label="Hi Tea" value="Hi Tea" />
            </Picker>
          </View>
        </View>
        <Button
          mode="contained"
          uppercase={false}
          style={{ marginVertical: 20 }}
          onPress={() => newDish()}>
          Request New Dish
        </Button>
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
  btn: {
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6C3483',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  title: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 15,
    shadowColor: '#00000029',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    marginVertical: 10,
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
  formControl: {
    backgroundColor: 'white',
    height: 40,
    padding: 0,
    // marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(RequestDish);
