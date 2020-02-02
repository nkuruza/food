import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import StoreItem from '../component/StoreItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import { CartService } from '../service/CartService';
import { Shop } from '../model/Shop';
import { User } from '../model/User';
import { Product } from '../model/Product';
import AuthenticatedScreen from './AuthenticatedScreen';



export default class Store extends AuthenticatedScreen {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <View style={styles.headerRight}>
                    <TouchableHighlight onPress={navigation.getParam('viewCart')} style={styles.headerButton}>
                        <Text>{navigation.getParam('numCartItems')}</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    }

    signInComplete(): void {

    }

    constructor(props) {
        super(props);
        //this.props.navigation.setParams({ numCartItems: 0 });
        this.props.navigation.setParams({ viewCart: this._viewCart })
        this.state = {
            shop: this.props.navigation.getParam('store'),
            cart:[]
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

    addToCart(product, qty) {
        CartService.add(product, qty).then(() => {
            return CartService.count(this.state.shop.id)
        }).then(num => {
            this.props.navigation.setParams({ numCartItems: num });
        });
    }

    isMyShop() {
        console.log(this.state)
        return this.state.shop.owner && this.user && this.state.shop.owner.username == this.user.preferred_username;
    }

    _viewCart = () => {
        console.log(this.state.cart.values());
        this.props.navigation.navigate('Cart', {
            shopId: this.state.shop.id
        })
    }

    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {
            shopId: this.state.shop.id,
            onGoBack: () => {
                this.getShopItems();
            },
            addToCart: (item: Product, qty: number) => {
                this.addToCart(item, qty);
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
                {
                    this.isMyShop() &&
                    <TouchableHighlight style={styles.button} onPress={this._createItem} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableHighlight>
                }
                
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shop.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}