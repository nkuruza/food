import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from '../style.js';
import { Common } from '../utils/Common.js';
import Cart from '../screens/Cart.js';
import OrderLineItem from './OrderLineItem.js';

export default class OrderItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    _renderItem = ({ item }) => {
        <OrderLineItem
            item={item}
            onPressItem={this._onPressItem}
        />
    }
    _keyExtractor = (item) => `item-${item.product.id}`;

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )

    render() {
        //console.log(this.props.item)
        console.log(this.props.item);
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.orderItem}>
                <View style={styles.orderCustomer}>
                    <Text>Order</Text>
                </View>

                <FlatList style={{width: 300}}
                    data={this.props.item.orderLines}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._itemSeparator}
                    keyExtractor={this._keyExtractor} />
            </TouchableOpacity>
        )
    }
}