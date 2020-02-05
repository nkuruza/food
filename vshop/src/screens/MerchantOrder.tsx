import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, ToastAndroid, ScrollView } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantShop from '../component/MerchantShop';
import { Shop } from '../model/Shop';
import { Order } from '../model/Order';
import CartItem from '../component/CartItem';


export default class MerchantOrder extends AuthenticatedScreen {
    signInComplete(): void {
        //throw new Error("Method not implemented.");
    }
    constructor(props) {
        super(props);
        this.state = { order: { shop: {} } };
    }
    componentDidMount() {
        super.componentDidMount();
        let order = this.props.navigation.getParam("order");
        console.log(order);
        this.setState({ order: order });
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} /> 
    )
    _renderItem = ({ item }) => (
        <CartItem
            item={item}
        />
    )
    render() {
        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        let total = 0;
        if (this.state.order.orderLines) {
            for (let line of this.state.order.orderLines)
                total += (line.qty * line.product.price)
        }
        let name = this.state.order.shop.name;
        let dateCreated = new Date(this.state.order.dateCreated).toLocaleDateString('en-za', dateOptions);
        let status = this.state.order.status ? this.state.order.status.type : '';
        return (
            <ScrollView>
                <Text>{name}</Text>
                <Text>{dateCreated}</Text>
                <Text>{status}</Text>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.order.orderLines}
                    renderItem={this._renderItem} />
                <View>
                    <Text>{total}</Text>
                </View>
            </ScrollView>
        )
    }
}