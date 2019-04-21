import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style.js';
import { Common } from '../utils/Common.js';

export default class OrderLineItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.cartItemImage}>
                    <Image style={styles.imgX4} source={require('../img/roast.png')} />
                </View>
                <View style={styles.cartItemText}>
                    <Text style={styles.cartItemTitle}>{this.props.item.product.name}</Text>
                    <Text style={styles.cartItemDesc}>{this.props.item.product.description}</Text>
                </View>
                <View style={styles.cartItemQty}>
                    <Text> X {this.props.item.qty}</Text>
                </View>
                <View style={styles.cartItemPrice}>
                    <Text>{Common.formatMoney(this.props.item.product.price * this.props.item.qty)}</Text>
                </View>
            </View>
        )
    }
}