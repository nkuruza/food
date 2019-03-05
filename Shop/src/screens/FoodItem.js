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
        this.state = { value: null, shopId: 0 }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        let shopId = this.props.navigation.getParam('shopId');
        this.setState({ shopId: shopId });
    }
    onChange(value) {
        this.setState({ value: value });
    }

    _saveFood = () => {
        console.log(this.state.value)
        FoodApi.addShopItem(this.state.shopId, this.state.value).then(response => {
            console.log(response);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={Product} />
                <TouchableHighlight style={styles.button} onPress={this._saveFood} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}