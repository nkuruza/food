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
                <Text style={styles.cartItemTitle}>{this.props.item.product.name}</Text>
                <Text style={{flex: 1}}> X {this.props.item.qty}</Text>
            </View>
        )
    }
}