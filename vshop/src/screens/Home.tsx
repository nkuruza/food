import React, { Component, } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';




export default class Home extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    signInComplete() {
        console.log("Sign in complete", this.roles)
        if (this.roles[0] == "ROLE_MERCHANT")
            this.props.navigation.navigate("Merchant");
        else if (this.roles[0] == "ROLE_CUSTOMER")
            this.props.navigation.navigate("Market");
        else
            console.log("Fuck")
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