import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
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
        this.state = { data: [] };
        this.props.navigation.setParams({ clearCart: this._clearCart })
    }
    componentDidMount() {
        //let data = this.props.navigation.getParam('cart'); this.setState({ data: data });
        this.refresh();
    }

    refresh(){
        let data = CartService.getCart().then(data => {
            console.log(data);
            this.setState({ data: data });
        });
    }
    _keyExtractor = (item) => `item-${item.product.id}`;

    _onPressItem = (item) => {
        //console.log("pressed");
        //console.log(item);
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

        //FoodApi.placeOrder
    }
    _clearCart = () => {
        CartService.clearCart();
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