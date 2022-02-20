import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

import { Logout } from '../store/actions';
import axios from 'axios';
import { Provider, useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(Logout())
    }
    const token = useSelector(state => state.AuthReducers.accessToken);

    axios({
        //token as asyncStorage
        method: "get",
        url: "http://192.168.18.9:3000/users/4",
        headers: {
            'accept': '*/*',
            'Cookie': `jwt=${token}`,
        }
    })
        .then(function (res) {
            console.log("response", res)
        })
        .catch(function (error) {
            console.log("error", error)
        })

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <StatusBar style="auto" />
            <ActivityIndicator size="large" color={"blue"} />
            <View style={{ margin: "10%" }} >

                <Button title="Logout"
                    onPress={logout}
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
