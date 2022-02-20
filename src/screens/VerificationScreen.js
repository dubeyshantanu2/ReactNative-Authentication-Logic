import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Login } from '../store/actions';
import axios from 'axios';

export default function VerificationScreen({ route, navigation }) {

    const [otp, setOtp] = useState('');
    // console.log(otp);
    let details = route.params.details;
    const dispatch = useDispatch();
    const submit = () => {
        dispatch(Login(otp, details))
    }

    return (
        <View style={styles.container}>
            <Text>Verification</Text>
            <StatusBar style="auto" />
            <Text style={{ padding: "10%" }}>Enter OTP sent to {route.params.mobile}</Text>
            <Text style={{ padding: "10%" }}>details from backend= {route.params.details}</Text>
            <TextInput
                style={{ marginTop: "5%", width: "90%", height: "5%", borderWidth: 1 }}
                lable="Mobile number"
                mode="outlined"
                maxLength={6}
                keyboardType="numeric"
                value={otp}
                onChangeText={(text) => setOtp(text)}
            />
            <View style={{ margin: "10%" }} >

                <Button title="Submit"
                    onPress={submit}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
