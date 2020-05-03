import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import { CartService } from '../service/CartService';
import { Product } from '../model/Product';
import AuthenticatedScreen from './AuthenticatedScreen';
import MarketProductItem from '../component/MarketProductItem';



export default class MarketShop extends AuthenticatedScreen {

    static navigationOptions = ({ navigation }) => {
        let count = navigation.getParam('numCartItems');
        return {
            headerRight: () => (
                <View style={styles.headerRight}>
                    {
                        count > 0 ?
                            <TouchableHighlight onPress={navigation.getParam('viewCart')} style={styles.headerButton}>
                                <Text>{count}</Text>
                            </TouchableHighlight>
                            : null
                    }
                </View>
            ),
            title: navigation.getParam('store').name
        }
    }

    signInComplete(): void {
        CartService.count(this.state.shop.id)
            .then(num => {
                this.props.navigation.setParams({ numCartItems: num });
            });
    }

    constructor(props) {
        super(props);
        this.props.navigation.setParams({ viewCart: this._viewCart })
        let shop = this.props.navigation.getParam('store');
        this.state = {
            shop: shop,
            cart: []
        };

    }

    componentDidMount() {
        super.componentDidMount();
        this.getShopItems();
    }



    _keyExtractor = (item: Product) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Product", {
            item: item, addToCart: (item, qty) => {
                this.addToCart(item, qty)
            }
        });
    };

    getShopItems() {
        FoodApi.getShopItems(this.state.shop.id).then(response => {
            StorageHelper.put('food-items', response);
            let shop = this.state.shop;
            shop.products = response;
            this.setState({ shop: shop });
        });
    }

    addToCart(product, qty: number) {
        CartService.add(product, qty).then(() => {
            return CartService.count(this.state.shop.id)
        }).then(num => {
            this.props.navigation.setParams({ numCartItems: num });
        });
    }


    _viewCart = () => {
        console.log(this.state.cart.values());
        this.props.navigation.navigate('Cart', {
            shopId: this.state.shop.id,
            shopp: this.state.shop
        })
    }

    /**
     * This needs to move somewhere safe...
     */
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MarketProductItem
            product={item}
            onItemAction={this._onPressItem}
        />
    );
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shop.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}