import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js'
import { FoodApi } from '../service/FoodApi.js';
import { StorageHelper } from '../service/Storage.js';

type Props = {};
const LoginForm = t.struct({
    username: t.String,
    password: t.String
});
var options = {
    label: 'Login',
    auto: 'placeholders',
    fields: {
        password: {
            secureTextEntry: true
        }
    }
}

const Form = t.form.Form;

export default class Login extends Component<Props>{
    static navigationOptions = {
        title: 'Login',
    };
    constructor(props) {
        super(props);
        this.state = { value: null };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.setState({ value: null });
        this.checkAuthentication();
    }

    checkAuthentication(){
        StorageHelper.get("Authorization").then(auth => {
            if (auth != null)
                this.props.navigation.navigate("Store");
        });
    }
    getCred() {
        return Base64.btoa(`${this.state.value.username}:${this.state.value.password}`);
    }
    
    onChange(value) {
        this.setState({ value: value });
    }
    _loginPress = () => {
        FoodApi.login(this.state.value)
            .then(response => {
                console.log(response);
                if (response.id > 0) {
                    StorageHelper.put("user", response);
                    StorageHelper.put("Authorization", { value: `Basic ${this.getCred()}` });
                    this.props.navigation.navigate("Store");
                }
            });
    }
    _signupPress = () =>{
        this.props.navigation.navigate("SignUp")
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={LoginForm}
                    options={options} />
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