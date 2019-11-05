import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { StorageHelper } from '../service/Storage';
import { User } from '../model/User';
import { Shop } from '../model/Shop';
import { Cart } from '../model/Cart';

export default class CartScreen extends Component<{navigation:any, shop: Shop, cart: Cart},{user: User}>{
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
        let shopId = this.props.navigation.getParam('shopId');
        this.props.navigation.setParams({ clearCart: this._clearCart })
    }
    componentDidMount() {
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
        let customer = this.state.user;
        CartService.getCart(this.state.shopId).then(lines => {
            console.log(lines);
            let order = {
                shop: lines[0].product.shop,
                orderLines: lines,
                customer: customer
            }
            return FoodApi.placeOrder(order);
        }).then(response => {
            console.log("ORDER SUCCESS");
            console.log(response);
            this._clearCart();
            this.props.navigation.navigate("CustomerOrder", { order: response });
        });
    }
    _clearCart = () => {
        CartService.clearCart(this.state.shopId).then((s) => {
            this.refresh();
        });
    }
    render() {
        let total = 0;
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