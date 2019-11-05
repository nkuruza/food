import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import StoreItem from '../component/StoreItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { StorageHelper } from '../service/Storage';
import { CartService } from '../service/CartService';



export default class Store extends Component<Props>{
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

    constructor(props) {
        super(props);
        this.state = { products: [], store: {}, user: {}, cart: [] }
        //this.props.navigation.setParams({ numCartItems: 0 });
        this.props.navigation.setParams({ viewCart: this._viewCart })
    }

    componentDidMount() {
        let store = this.props.navigation.getParam('store');
        StorageHelper.get("user").then(user => {
            this.setState({ user: user, store: store, shopId: store.id }, () => { this.getShopItems() });       // TODO shopId should be a prop
        });
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Product", {
            item: item, addToCart: (item, qty) => {
                this.addToCart(item, qty)
            }
        });
    };

    getShopItems() {
        FoodApi.getShopItems(this.state.store.id).then(response => {
            StorageHelper.put('food-items', response);
            this.setState({ products: response });
        });
    }

    addToCart(product, qty) {
        console.log(product)
        console.log(qty)
        CartService.add(product, qty).then(() => {
            return CartService.count(this.state.store.id)
        }).then(num => {
            console.log(num)
            this.props.navigation.setParams({ numCartItems: num });
        });
    }

    isMyShop() {
        return this.state.store.owner && this.state.user && this.state.store.owner.id == this.state.user.id;
    }

    _viewCart = () => {
        this.props.navigation.navigate('Cart', {
            cart: Array.from(this.state.cart.values()),
            shopId: this.state.store.id
        })
    }

    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {
            shopId: this.state.store.id,
            onGoBack: () => {
                this.getShopItems();
            },
            addToCart: (item, qty) => {
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