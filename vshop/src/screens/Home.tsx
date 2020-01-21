import React, { Component, } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { AuthenticationApi } from '../service/Authentication';
import { Base64 } from '../utils/Base64';
import { Props } from '../utils/Common';
import AuthenticatedScreen from './AuthenticatedScreen';




export default class Home extends AuthenticatedScreen{

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {

    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MerchantItem
            item={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    )
    _merchantLogin = () => {
        this.props.navigation.navigate("Merchant");
    }

    _customerLogin = () => {
        this.props.navigation.navigate("Market");
    }
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._merchantLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Merchant Login</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._customerLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Customer Login</Text>
                </TouchableHighlight>
            </View>

        )
    }
}