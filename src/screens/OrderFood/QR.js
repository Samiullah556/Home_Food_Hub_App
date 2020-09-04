import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Title, Subheading, Dialog, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import QRcode from '../../assets/QRcode.jpeg';
const QR = ({navigation}) => {
  const [state, setState] = useState({
    visible: false,
    dialogMsg: 'Your Order has been placed !',
  });
  const hideDialog = () => {
    setState({
      ...state,
      visible: false,
    });
    navigation.navigate('Profile', {getorders: true});
  };

  const showDialoge = () => {
    setState({
      ...state,
      visible: true,
    });
  };
  return (
    <>
      <Portal>
        <Dialog visible={state.visible} onDismiss={hideDialog}>
          <Dialog.Title>{state.dialogMsg}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <Image
          style={{marginTop: 100, height: 250, width: 250, alignSelf: 'center'}}
          source={QRcode}
        />
        <Subheading style={styles.title}>
          Please scan this QR code to pay with your easypaisa account
        </Subheading>
        <Button style={styles.btn} mode="text" onPress={() => showDialoge()}>
          Confirm Payment
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn: {
    marginTop: 80,
  },
  title: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(QR);
