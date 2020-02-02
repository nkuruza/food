import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Text, View, ScrollView } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { User } from '../model/User';
import { Shop } from '../model/Shop';
import { Cart } from '../model/Cart';
import AuthenticatedScreen from './AuthenticatedScreen';

export default class CartScreen extends AuthenticatedScreen{
    signInComplete(): void {
        
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableHighlight onPress={navigation.getParam('clearCart')} style={styles.headerButton}>
                    <Text>Clear</Text>
                </TouchableHighlight>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
         }
        let shopId = props.navigation.getParam('shopId');
        CartService.getCart(shopId).then(items => {
            this.setState({data: items, shopId: shopId})
        });
        this.props.navigation.setParams({ clearCart: this._clearCart })
    }
    componentDidMount() {
        super.componentDidMount();
        this.refresh();
    }

    refresh() {

    }
    _keyExtractor = (item) => `item-${item.product.id}`;

    _onPressItem = (item) => {

    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <CartItem
            item={item}
            onPressItem={this._onPressItem}
        />
    )

    _placeOrder = () => {
        let coords: Position = {};
        let customer = this.user;
        CartService.getCart(this.state.shopId).then(lines => {
            let order = {
                shop: lines[0].product.shop,
                orderLines: lines,
                customer: customer
            }
            return FoodApi.placeOrder(order);
        }).then(response => {
            this._clearCart();
            this.props.navigation.navigate("CustomerOrder", { order: response });
        }).catch(error => {
            console.log("fucking error", error)
        });
    }
    _clearCart = () => {
        CartService.clearCart(this.state.shopId).then((s) => {
            this.refresh();
        });
    }
    render() {
        let total = 0;
        if (this.state.data)
            for (item of this.state.data)
                total += (item.product.price * item.qty);
        return (
            <ScrollView>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
                <TouchableHighlight onPress={this._placeOrder} style={styles.button}>
                    <Text style={styles.buttonText}>Place Order for R {total}</Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}