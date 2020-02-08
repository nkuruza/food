import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, ToastAndroid, ScrollView } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantShop from '../component/MerchantShop';
import { Shop } from '../model/Shop';
import { Order } from '../model/Order';


export default class Merchant extends AuthenticatedScreen {
    signInComplete(): void {
        this.listShops();
        this.listMyShopOrders();
    }
    constructor(props) {
        super(props);
        this.state = { shops: [], orders: [] };
    }
    componentDidMount() {
        super.componentDidMount();

    }
    listShops() {
        FoodApi.listMyShops().then(response => {
            this.setState({ shops: response });
            
        })
            .catch(e => {
                if (e.response.status === 401) {
                    console.log('unauthorized')
                    ToastAndroid.show("You are not allowed to list shops", ToastAndroid.LONG)
                }
                else {
                    console.log(e);
                }

            });
    }
    listMyShopOrders() {
        FoodApi.myShopOrders().then(response => {
            this.setState({ orders: response })
            StorageHelper.put("orders", response);
            for (let order of response) {
                this.addOrder(order);
            }
        });
    }

    addOrder(order: any) {
        let shops = this.state.shops

        for (let shop of shops) {
            console.log(shop)
            if (order.shop.id == shop.id) {
                if (!shop.orders)
                    shop.orders = [];
                shop.orders.push(order)
            }
        }
        this.setState({ shops: shops })
        console.log("SHOPS", shops)
    }

    getShopOrders(id: number): Order[] {
        let orders: Order[] = [];
        for (let order of this.state.orders) {
            if (order.shop.id == id)
                orders.push(order)
        }
        return orders;
    }

    _createShop = () => {
        this.props.navigation.navigate("ShopForm", {
            listShops: () => {
                this.listShops();
            }
        });
    }
    _logout = () => {
        super.logout();
    }
    _keyExtractor = (item) => `item-${item.id}`;


    _onItemAction = ({shop}, action: string) => {
        if (action == "orders")
            this.props.navigation.navigate("Orders", { shopId: shop.id });
        else if (action == "view")
            this.props.navigation.navigate("Store", { store: shop });

    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MerchantShop
            item={{shop: item, orders: this.getShopOrders(item.id)}}
            onItemAction={this._onItemAction}
        />
    )
    render() {
        return (
            <ScrollView>
                <TouchableHighlight style={styles.button} onPress={this._createShop} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create Shop</Text>
                </TouchableHighlight>

                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </ScrollView>
        )
    }
}