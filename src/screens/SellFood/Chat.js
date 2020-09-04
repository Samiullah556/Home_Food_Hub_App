import React, { useState, useCallback, useEffect } from 'react';

import { GiftedChat } from 'react-native-gifted-chat';

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
import Moment from 'moment';

import io from "socket.io-client";

const Chat = ({ route, auth }) => {
    const { colors } = useTheme();

    const [state, setState] = useState({
        loading: false,
        visible: false,
        snackbarMsg: '',
    });

    const [messages, setMessages] = useState([]);

    let socket;
    useEffect(() => {
            getAllChats();

            // Socket working
            socket = io(SERVER_URL);
            let info = { customerId: route.params.customerEmail, chefId: route.params.chefEmail }
            socket.emit('chef-new-chat', info);
            socket.on("chef-new-chat", data => {
                if (data.chefId === route.params.chefEmail) {
                    console.log('New Chat Request msg: ', data);
                }
            });

            socket.on('send-chat-message-chef', data => {
                if (data.chef_id === route.params.chefEmail) {
                    console.log('send-chat-message-chef: ', data);
                    let messages = [{
                        _id: data._id,
                        text: data.message,
                        createdAt: data.created,
                        user: {
                            _id: route.params.customerId,
                            name: route.params.customerName,
                        }
                    }];
                    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
                }
            });

    }, [route.params]);

    const getAllChats = async () => {
        console.log('getAllChats call')
        setState({
            ...state,
            loading: true,
        });
        try {
            // console.log('getAllChat call')
            // console.log('Chat url:', SERVER_URL + '/chat?customerId=' + route.params.customerEmail + '&chefId=' + route.params.chefEmail);
            let res = await axios.get(SERVER_URL + '/chat?customerId=' + route.params.customerEmail + '&chefId=' + route.params.chefEmail);
            let chat = res.data;
            // console.log('chat:', chat)
            chat.map((c) => {
                // console.log('c:', c)
                if (c.sendBy === 'customer') {
                    // console.log('c.sendBy:', c.sendBy)
                    messages.push({
                        _id: c._id,
                        text: c.message,
                        createdAt: Moment(c.created).add(-5, 'hours'),
                        user: {
                            _id: route.params.customerId,
                            name: route.params.customerName,
                        }
                    });
                } else {
                    messages.push({
                        _id: c._id,
                        text: c.message,
                        createdAt: Moment(c.created).add(-5, 'hours'),
                        user: {
                            _id: route.params.chefId,
                            name: route.params.chefName,
                        }
                    });
                }
            });

            // setMessages(chats);
            setState({
                ...state,
                loading: false,
            });
        } catch (e) {
            setState({
                ...state,
                loading: false,
                visible: true,
                snackbarMsg: 'Network Error! Fail to fetch Chef(s)',
            });
            //   console.log(e);
        }
    };

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log('messages: ', messages);
        let customerMessage = { customerName: route.params.customerName, customerId: route.params.customerEmail, chefId: route.params.chefEmail, message: messages[0].text };
        console.log('customerMessage: ', customerMessage);
        socket.emit('send-chat-message-chef', customerMessage)
    }, []);

    return (
            <>
                <View
                    style={{
                        borderColor: 'purple',
                        borderWidth: 2,
                        borderRadius: 10,
                        padding: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Subheading style={{ color: colors.primary }}>
                            Chat with customer:
                        </Subheading>
                        <Subheading> {route.params.customerName}</Subheading>
                    </View>
                </View>

                <GiftedChat
                    messages={messages}
                    onSend={messages => {
                        console.log('onSend messages:', messages);
                        onSend(messages)
                    }}
                    user={{
                        _id: route.params.chefId,
                    }}
                />
            </>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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


    loginView: {
        paddingHorizontal: 50,
        paddingTop: '50%',
        backgroundColor: 'white',
    },
    heading2: {
        fontSize: 16,
        textAlign: 'center',
        color: 'grey',
    },
});

const mapStateToProps = (state) => ({
    customer: state.customer,
});

export default connect(mapStateToProps, {})(Chat);
