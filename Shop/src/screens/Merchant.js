import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import MerchantItem from '../component/MerchantItem.js';
import { StorageHelper } from '../service/Storage.js';

type Props = {};

export default class Merchant extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { shops: [] };
    }
    componentDidMount() {
        StorageHelper.get("Authorization").then(auth => {
            if (auth)
                this.listShops();
            else
                this.props.navigation.navigate("Login")
        });
    }
    unauthorized() {
        StorageHelper.remove('Authorization').then(removed => {
            this.props.navigation.navigate("Login", { screen: "Merchant" })
        })

    }
    listShops() {
        FoodApi.listMyShops().then(response => {
            console.log(response);
            this.setState({ shops: response })
        }).catch(e => {
            if (e.response.status === 401) {
                this.unauthorized();
            }
            else {
                console.log(e);
            }

        });
    }
    _createShop = () => {
        this.props.navigation.navigate("ShopForm");
    }
    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { store: item });
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