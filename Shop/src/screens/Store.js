import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import StoreItem from '../component/StoreItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';

export default class Store extends Component<Props>{


    constructor(props) {
        super(props);
        this.state = { products: [] }
    }

    componentDidMount() {
        let store = this.props.navigation.getParam('store');
        console.log(store);
        this.setState({ shopId: store.id }, () => { this.refresh() });
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("ViewProduct", { product: item });
    };
    refresh() {
        FoodApi.getShopItems(this.state.shopId).then(response => {
            this.setState({ products: response });
        })
    }

    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {
            shopId: this.state.shopId,
            onGoBack: () => {
                this.refresh();
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
                <TouchableHighlight style={styles.button} onPress={this._createItem} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </View>

        )
    }
}