import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Login } from '../store/actions'

import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {

    const [mobile, setMobile] = useState('');

    // console.log(mobile);

    // const dispatch = useDispatch();
    const submit = () => {
        // dispatch(Login(mobile))
        // const details = "";
        axios({
            method: "post",
            url: 'http://youripaddress:3000/otp/generate',
            data: {
                number: mobile,
            },
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            }
        })
            .then(function (res) {
                console.log("response", res.data[0].details)
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Verification',
                        params: {
                            details: res.data[0].details,
                            mobile: mobile,
                        },
                    })
                );
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={{ padding: "10%" }}>Enter Your mobile number to Login</Text>
            <TextInput
                style={{ marginTop: "5%", width: "90%", height: "5%", borderWidth: 1 }}
                lable="Mobile number"
                mode="outlined"
                // maxLength={10}
                // keyboardType="decimal-pad"
                value={mobile}
                onChangeText={(text) => setMobile(text)}
            />
            <View style={{ margin: "10%" }} >

                <Button title="Login"
                    onPress={submit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
