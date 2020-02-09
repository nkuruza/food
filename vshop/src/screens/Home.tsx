import React, { Component, } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';




export default class Home extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }
    
    componentDidMount() {
        super.componentDidMount();

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                //super.signIn();
            }
        );
    }

    

    signInComplete() {
        if (this.roles.length == 0) this.props.navigation.navigate("UserDetails");

        if (this.roles[0] == "ROLE_MERCHANT")
            this.props.navigation.replace("Merchant");
        else if (this.roles[0] == "ROLE_CUSTOMER")
            this.props.navigation.replace("Market");
        else
            console.log("Fuck")

    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {

    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
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