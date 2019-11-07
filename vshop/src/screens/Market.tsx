import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, Asset } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { API_URL, API_WS, AUTH_APP, clientId, realm } from "../../config.json";
import { ExpoKeyckloakLogin, defaultTokenStorage } from 'expo-login-keycloak';

type Props = {};

export default class Market extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    private loadResourcesAsync = async () => {

        await Promise.all([
            this.login()
        ]);
    }

    private async login() {
        let login = new ExpoKeyckloakLogin({
            clientId: clientId,
            realm: realm,
            url: AUTH_APP
        })
        console.log('somehow we are in login');
        console.log(API_URL)
        let tokens = await login.login()
        await defaultTokenStorage.saveTokens(tokens)
        let token = tokens.access_token
        console.log(token)
        await defaultTokenStorage.showUser()
    }

    componentDidMount() {
        this.loadResourcesAsync();
        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
        })
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { shop: item, user: { id: 0 } });
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
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._merchantLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Merchant Login</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}