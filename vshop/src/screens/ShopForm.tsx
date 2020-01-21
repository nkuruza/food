import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { Props } from '../utils/Common'


export default class ShopForm extends Component<Props>{
    constructor(props:Props){
        super(props);
        this.state = {value : null}
        this.onChange = this.onChange.bind(this)
    }
    _onPress = () => {
        //FoodApi.saveShop(this.state.value)
    }
    onChange(value) {
        this.setState({ value: value });
    }

    render() {
        return (
            <View>
                
                <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}