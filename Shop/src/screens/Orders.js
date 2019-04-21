import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { StorageHelper } from '../service/Storage';
import OrderItem from '../component/OrderItem';
type Props = {};

export default class Orders extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { data: [], user: null };
    }
    componentDidMount() {
        StorageHelper.get("orders").then(orders => {
            this.setState({ data: orders });
        })
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <OrderItem
            item={item}
            onPressItem={this._onPressItem}
        />
    )
    render(){
        return (<ScrollView>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
            </ScrollView>)
    }
}