import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js'
import { FoodApi } from '../service/FoodApi.js';

type Props = {};
const Form = t.form.Form;
const Product = t.struct({
    name: t.String,
    description: t.String,
    price: t.Number
});

export default class FoodItem extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { value: null }
    }
    _saveFood = () => {
        FoodApi.addShopItem(this.state.value).then(response => {
            console.log("Food Saved");
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={Product}
                    options={options} />
                <TouchableHighlight style={styles.button} onPress={this._saveFood} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}