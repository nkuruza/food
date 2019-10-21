import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import t from 'tcomb-form-native';


type Props = {};
const Shop = t.struct({
    name: t.String,
    address: t.String
});
const Form = t.form.Form;
export default class ShopForm extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {value : null}
        this.onChange = this.onChange.bind(this)
    }
    _onPress = () => {
        FoodApi.saveShop(this.state.value)
    }
    onChange(value) {
        this.setState({ value: value });
    }

    render() {
        return (
            <View>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={Shop} />
                <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}