import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import MerchantItem from '../component/MerchantItem';
import { StorageHelper } from '../service/Storage';

type Props = {};

export default class Merchant extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { shops: [], orders: [] };
    }
    componentDidMount() {
        StorageHelper.get("Authorization").then(auth => {
            if (auth) {
                this.listShops();
                this.listMyShopOrders();
            }
            else
                this.props.navigation.navigate("Login")
        });
    }
    unauthorized() {
        StorageHelper.remove('Authorization').then(removed => {
            this.props.navigation.navigate("Login", { screen: "Merchant" })
        })

    }
    listMyShopOrders() {
        FoodApi.myShopOrders().then(response => {
            this.setState({ orders: response })
            StorageHelper.put("orders", response);
            console.log(response);
        });
    }
    listShops() {
        FoodApi.listMyShops().then(response => {
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
    _logout = () => {
        StorageHelper.remove('Authorization').then(() => {
            StorageHelper.remove("user")

        }).then(() => {
            this.props.navigation.popToTop();
        })
    }
    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { store: item });
    }
    _viewOrders = () => {
        
        this.props.navigation.navigate("Orders");
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
                <TouchableHighlight style={styles.button} onPress={this._logout} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._createShop} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create Shop</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._viewOrders}>
                    <Text style={styles.titleText}>{this.state.orders.length} orders</Text>
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