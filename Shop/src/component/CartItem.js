import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style.js';

export default class CartItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render() {
        //console.log(this.props.item)
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.cartItem}>
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
                    <Text>R {this.props.item.product.price * this.props.item.qty}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}