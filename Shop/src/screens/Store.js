import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import StoreItem from '../component/StoreItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';



export default class Store extends Component<Props>{
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <View style={{ width: 20, height: 20, borderRadius: 10 }}>
                    <Text>{navigation.getParam('numCartItems')}</Text>
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = { products: [], store: {}, user: {}, cart: [] }
        this.props.navigation.setParams({ numCartItems: 0 });
    }

    componentDidMount() {
        let store = this.props.navigation.getParam('store');
        StorageHelper.get("user").then(user => {
            this.setState({ user: user, store: store, shopId: store.id }, () => { this.refresh() });
        });
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Product", {
            item: item, addToCart: (item) => {
                this.addToCart(item)
            }
        });
    };

    refresh() {
        FoodApi.getShopItems(this.state.store.id).then(response => {
            StorageHelper.put('food-items', response);
            this.setState({ products: response });
        });
    }

    addToCart(orderLine) {
        let cart = this.state.cart;
        cart.push(orderLine);
        this.setState({ cart: cart });
        this.props.navigation.setParams({ numCartItems: cart.length });
    }

    isMyShop() {
        return this.state.store.owner && this.state.store.owner.id == this.state.user.id;
    }

    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {
            shopId: this.state.store.id,
            onGoBack: () => {
                this.refresh();
            },
            addToCart: (item) => {
                this.addToCart(item);
            }
        });
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <StoreItem
            item={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    );
    render() {
        return (
            <View>
                {
                    this.isMyShop() &&
                    <TouchableHighlight style={styles.button} onPress={this._createItem} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableHighlight>
                }

                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}