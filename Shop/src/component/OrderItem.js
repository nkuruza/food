import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style.js';
import { Common } from '../utils/Common.js';
import Cart from '../screens/Cart.js';

export default class OrderItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render() {
        //console.log(this.props.item)
        console.log(this.props.item);
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.orderItem}>
                <View style={styles.orderCustomer}>
                    
                </View>
                <View style={styles.orderItemDetails}>
                    <Cart data={item.orderLines}></Cart>
                </View>
                
            </TouchableOpacity>
        )
    }
}