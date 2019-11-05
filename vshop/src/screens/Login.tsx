import React, { Component } from 'react';
import { TouchableHighlight, Text, View, TextInput } from 'react-native';
import styles from '../style'
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import { Base64 } from '../utils/Base64'

export default class Login extends Component{
    static navigationOptions = {
        title: 'Login',
    };
    constructor(props) {
        super(props);
        this.state = { username:'', password: '' };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.setState({ username:'', password: '' });
        this.checkAuthentication();
    }

    checkAuthentication() {
        StorageHelper.get("Authorization").then(auth => {
            if (auth != null)
                this.props.navigation.navigate("Store");
        });
    }
    getCred() {
        return Base64.btoa(`${this.state.username}:${this.state.password}`);
    }

    _loginPress = () => {
        /*StorageHelper.put("Authorization", { value: `Basic ${this.getCred()}` }).then(() => {
            return FoodApi.login(this.state.value);
        }).then(response => {
            console.log(response);
            if (response.id > 0) {
                StorageHelper.put("user", response);

                this.props.navigation.navigate("Store");
            }
        });*/
    }
    _signupPress = () => {
        this.props.navigation.navigate("SignUp")
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.username}></TextInput>
                <TextInput secureTextEntry="true" value={this.state.password}></TextInput>
                <TouchableHighlight style={styles.button} onPress={this._signupPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._loginPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}