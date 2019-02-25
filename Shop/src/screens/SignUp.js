import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js'
import { FoodApi } from '../service/FoodApi.js';
import { StorageHelper} from '../service/Storage';
import { Base64} from '../utils/Base64'


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

export default class UserForm extends Component<Props>{
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props) {
        super(props);
        this.state = { value: null, deviceId: null };
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        var id = DeviceInfo.default.getUniqueID();
        this.setState({ deviceId: id });
        
        //this.getUserByDevice(id);
    }
    getUserByDevice(id){
        FoodApi.getUserByDevice(id)
            .then( response => {
                if(response && response.id > 0){
                    StorageHelper.put("user", response);
                    let cred = Base64.btoa(`${this.state.value.username}:${this.state.value.password}`);
                    StorageHelper.put("Authorization", {value: `Basic ${cred}`});
                    this.props.navigation.navigate("Home");
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
                if (response.id > 0){
                    StorageHelper.put("user", response);
                    this.props.navigation.navigate("Home");
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