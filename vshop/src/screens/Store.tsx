import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import StoreItem from '../component/StoreItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import { CartService } from '../service/CartService';
import { Product } from '../model/Product';
import AuthenticatedScreen from './AuthenticatedScreen';



export default class Store extends AuthenticatedScreen {

    

    signInComplete(): void {

    }

    constructor(props) {
        super(props);
        //this.props.navigation.setParams({ numCartItems: 0 });
        this.state = {
            shop: this.props.navigation.getParam('store'),
            cart: []
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.getShopItems();
    }



    _keyExtractor = (item: Product) => `item-${item.id}`;

    _onPressItem = (product:Product) => {
        this.props.navigation.navigate("EditProduct", {
            product: product,
            onGoBack: () => {
                this.getShopItems();
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

    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {
            shopId: this.state.shop.id,
            onGoBack: () => {
                this.getShopItems();
            }
        });
    }
    /**
     * This needs to move somewhere safe...
     */
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <StoreItem
            product={item}
            onProductItemAction={this._onPressItem}
        />
    );
    render() {
        return (
            <View>
                <Text style={styles.titleText}>{this.state.shop.name}</Text>
                <TouchableHighlight style={styles.button} onPress={this._createItem} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shop.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}