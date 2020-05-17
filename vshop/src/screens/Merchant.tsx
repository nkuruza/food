import React, { Component } from 'react';
import { FlatList, View, Text, ToastAndroid, ScrollView } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantShop from '../component/MerchantShop';
import Menu from '../component/Menu';
import { Order } from '../model/Order';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default class Merchant extends AuthenticatedScreen {
    signInComplete(): void {
        this.refresh()
    }
    refresh() {
        console.log("ACCESS:", this.token)
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

    _keyExtractor = (item) => `item-${item.id}`;


    _onItemAction = ({ shop }, action: string) => {
        if (action == "orders")
            this.props.navigation.replace("Orders", { shopId: shop.id });
        else if (action == "view")
            this.props.navigation.replace("Store", { store: shop });

    }

    _onMenuAction = (item: string, action: string) => {
        switch (item) {
            case "logout":
                super.logout();
                break;

        }
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => {
        item.token = this.token;
        return (

            <MerchantShop
                item={{ shop: item, orders: this.getShopOrders(item.id) }}
                onItemAction={this._onItemAction}
            />
        )
    }
    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                    <TouchableHighlight style={styles.button} onPress={this._createShop} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create Shop</Text>
                    </TouchableHighlight>

                    <FlatList
                        ItemSeparatorComponent={this._itemSeparator}
                        data={this.state.shops}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem} />
                </View>
                {
                    this.state.showMenu ?
                        <Menu onAction={this._onMenuAction} role={this.state.role}>

                        </Menu> : null
                }

            </View>
        )
    }
}