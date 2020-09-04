import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, Title, Subheading, Checkbox, Card} from 'react-native-paper';
import {connect} from 'react-redux';

const Filter = ({navigation}) => {
  const [state, setState] = useState({
    category: [],
    cuisine: [],
  });

  const [category, setCategory] = useState([
    {name: 'BreakFast', status: 'unchecked'},
    {name: 'Lunch', status: 'unchecked'},
    {name: 'Dinner', status: 'unchecked'},
    {name: 'Diet Food', status: 'unchecked'},
    {name: 'Bakery Item', status: 'unchecked'},
    {name: 'Desserts', status: 'unchecked'},
    {name: 'Hi Tea', status: 'unchecked'},
    {name: 'Other', status: 'unchecked'},
  ]);

  const [cuisine, setCuisine] = useState([
    {name: 'Desi Food', status: 'unchecked'},
    {name: 'Fast Food', status: 'unchecked'},
    {name: 'Chinese Food', status: 'unchecked'},
    {name: 'Sea Food', status: 'unchecked'},
    {name: 'Italian Food', status: 'unchecked'},
    {name: 'BBQ', status: 'unchecked'},
  ]);

  const applyFilter = () => {
    navigation.navigate('Home', {
      category: state.category,
      cuisine: state.cuisine,
      filterClear: false,
    });
  };

  const removeFilter = () => {
    setCuisine([
      {name: 'Desi Food', status: 'unchecked'},
      {name: 'Fast Food', status: 'unchecked'},
      {name: 'Chinese Food', status: 'unchecked'},
      {name: 'Sea Food', status: 'unchecked'},
      {name: 'Italian Food', status: 'unchecked'},
      {name: 'BBQ', status: 'unchecked'},
      {name: 'Other', status: 'unchecked'},
    ]);
    setCategory([
      {name: 'BreakFast', status: 'unchecked'},
      {name: 'Lunch', status: 'unchecked'},
      {name: 'Dinner', status: 'unchecked'},
      {name: 'Diet Food', status: 'unchecked'},
      {name: 'Bakery Item', status: 'unchecked'},
      {name: 'Desserts', status: 'unchecked'},
      {name: 'Hi Tea', status: 'unchecked'},
    ]);
    setState({
      category: [],
      cuisine: [],
    });
    navigation.navigate('Home', {category: [], filterClear: true});
  };

  const select = (c, i, name) => {
    switch (c) {
      case 'category':
        let a = [...category];
        let f = [...state.category];

        if (a[i].status === 'checked') {
          a[i].status = 'unchecked';
          let index = f.indexOf(name);
          f.splice(index, 1);
        } else {
          a[i].status = 'checked';
          f.push(name);
        }
        setState({
          ...state,
          category: f,
        });
        setCategory(a);
        // console.log(f);
        break;

      case 'cuisine':
        let b = [...cuisine];
        let fc = [...state.cuisine];

        if (b[i].status === 'checked') {
          b[i].status = 'unchecked';
          let inde = fc.indexOf(name);
          fc.splice(inde, 1);
        } else {
          b[i].status = 'checked';
          fc.push(name);
        }
        setCuisine(b);
        setState({
          ...state,
          cuisine: fc,
        });
        // console.log(fc);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ScrollView>
        <Button
          style={styles.clearbtn}
          icon="trash-can-outline"
          mode="text"
          onPress={() => removeFilter()}>
          Clear Filters
        </Button>
        <Card style={styles.card}>
          <Title style={styles.title}>Category</Title>
          {category.map((i, index) => {
            return (
              <View key={index} style={styles.row}>
                <Subheading>{i.name}</Subheading>
                <Checkbox
                  color="purple"
                  status={i.status}
                  onPress={() => select('category', index, i.name)}
                />
              </View>
            );
          })}
        </Card>
        {/* <Card style={styles.card}>
        <Title style={styles.title}>Cuisine</Title>
        {cuisine.map((i, index) => {
          return (
            <View key={index} style={styles.row}>
              <Subheading>{i.name}</Subheading>
              <Checkbox
                color="purple"
                status={i.status}
                onPress={() => select('cuisine', index, i.name)}
              />
            </View>
          );
        })}
      </Card> */}
      </ScrollView>
      <Button
        labelStyle={{marginVertical: 12}}
        mode="contained"
        style={styles.btn}
        icon="plus"
        onPress={() => applyFilter()}>
        Apply Filters
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearbtn: {
    marginVertical: 5,
  },
  btn: {
    position: 'absolute',
    borderRadius: 0,
    bottom: 0,
    width: '100%',
  },
  card: {
    marginTop: '15%',
    marginHorizontal: 40,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    backgroundColor: '#6C3483',
    color: 'white',
    padding: 3,
    fontSize: 18,
    borderRadius: 25,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Filter);
