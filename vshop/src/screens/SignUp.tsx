import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style'
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
//import { Base64 } from '../utils/Base64'
import { Props } from '../utils/Common'


var options = {
    label: 'User Details',
    auto: 'placeholders',
    fields: {
        password: {
            secureTextEntry: true
        },
        confirmPassword: {
            secureTextEntry: true
        }
    }
}

export default class SignUp extends React.Component<Props>{
    static navigationOptions = {
        title: 'Sign Up',
    };
    constructor(props) {
        super(props);
        this.state = { value: null, deviceId: null };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.setState({ value: {} });
        this.checkAuthentication();
    }

    checkAuthentication() {
        StorageHelper.get("Authorization").then(auth => {
            if (auth != null)
                this.props.navigation.navigate("Merchant");
        });
    }

    getCred() {
        //return Base64.btoa(`${this.state.value.username}:${this.state.value.password}`);
    }
    getUserByDevice(id) {
        FoodApi.getUserByDevice(id)
            .then(response => {
                if (response && response.id > 0) {
                    StorageHelper.put("user", response);
                    this.props.navigation.navigate("Store");
                }
            });
    }
    onChange(value) {
        this.setState({ value: value });
    }
    onPress = () => {
        /*FoodApi.signUp(this.state.value)
            .then(response => {
                console.log(response);
                if (response.id > 0) {
                    StorageHelper.put("user", response);
                    StorageHelper.put("Authorization", { value: `Basic ${this.getCred()}` });
                    this.props.navigation.navigate("Store");
                }
            });*/
    }
    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}