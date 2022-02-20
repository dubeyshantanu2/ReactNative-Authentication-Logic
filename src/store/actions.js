//api for storing access token will be done here

import React from 'react';
import axios from 'axios';

import AsyncStorage from "@react-native-async-storage/async-storage";

// storing the seesion of use using device cache

export const Init = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token');
        if (token !== null) {
            console.log('token fetched');
            dispatch({
                type: 'LOGIN',
                payload: token,
            })
        }
    }
}

export const Login = (otp, details) => {

    return async dispatch => {
        let token = null;
        axios({
            method: "post",
            url: 'http://youripaddress:3000/otp/verify',
            data: {
                userOtp: otp,
                encryptedString: details,
            },
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            }
        })
            .then(function (res) {
                console.log("response", res.data.data.accessToken)
                token = res.data.data.accessToken;
                AsyncStorage.setItem('token', token);
                console.log('token stored');
                dispatch({
                    type: "LOGIN",
                    payload: token,
                })
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }
}

export const Logout = () => {
    return async dispatch => {
        await AsyncStorage.clear();
        dispatch({
            type: 'LOGOUT'
        })
    }
}
