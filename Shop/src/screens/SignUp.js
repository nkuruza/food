import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js'
import { FoodApi } from '../service/FoodApi.js';
import { StorageHelper } from '../service/Storage';
import { Base64 } from '../utils/Base64'


var DeviceInfo = require('react-native-device-info');

type Props = {};
const User = t.struct({
    username: t.String,
    password: t.String,
    confirmPassword: t.String,
    firstName: t.String,
    lastName: t.String,
    email: t.String,
    phone: t.String
});
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

const Form = t.form.Form;
var randomString = require('random-string');

export default class SignUp extends Component<Props>{
    static navigationOptions = {
        title: 'Sign Up',
    };
    constructor(props) {
        super(props);
        this.state = { value: null, deviceId: null };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        var id = DeviceInfo.default.getUniqueID();
        this.setState({ deviceId: id, value: this.dummyData() });
        this.checkAuthentication();
    }

    checkAuthentication(){
        StorageHelper.get("Authorization").then(auth => {
            if (auth != null)
                this.props.navigation.navigate("Merchant");
        });
    }

    dummyData() {
        return {
            username: randomString(),
            password: randomString(),
            confirmPassword: randomString(),
            firstName: randomString(),
            lastName: randomString(),
            email: randomString(),
            phone: randomString()
        }
    }
    getCred() {
        return Base64.btoa(`${this.state.value.username}:${this.state.value.password}`);
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
        console.log(this.state.value)
        FoodApi.signUp(this.state.value)
            .then(response => {
                console.log(response);
                if (response.id > 0) {
                    StorageHelper.put("user", response);
                    StorageHelper.put("Authorization", { value: `Basic ${this.getCred()}` });
                    this.props.navigation.navigate("Store");
                }
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={User}
                    options={options} />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}