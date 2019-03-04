import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';

type Props = {};

export default class Merchant extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {shops: []};
    }
    _createShop = () => {
        this.props.navigation.navigate("ShopForm");
    }
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._createShop} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create Shop</Text>
                </TouchableHighlight>
                <Text style={styles.titleText}></Text>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>
        )
    }
}