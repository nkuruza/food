import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { StorageHelper } from '../service/Storage';
type Props = {};

export default class Cart extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <View style={styles.headerRight}>
                    <TouchableHighlight onPress={navigation.getParam('clearCart')} style={styles.headerButton}>
                        <Text>Clear</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = { data: [], user: null };
        this.props.navigation.setParams({ clearCart: this._clearCart })
    }
    componentDidMount() {
        this.refresh();
    }

    refresh() {
        CartService.getCart().then(data => {
            this.setState({ data: data });
        });
        StorageHelper.get("user").then(user => {
            this.setState({ user: user })
        })
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
        CartService.getCart().then(lines => {
            let order = {
                shop: lines[0].product.shop,
                orderLines: lines,
                customer: this.state.user
            }
            return FoodApi.placeOrder(order)
        }).then(response => {
            console.log(response);
        });
    }
    _clearCart = () => {
        CartService.clearCart().then((s) => {
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