import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { Common, Props } from '../utils/Common';


export default class OrderLineItem extends React.PureComponent <{item:any, onPressItem: any}>{
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.cartItemTitle}>{this.props.item.product.name}</Text>
                <Text style={{ flex: 1 }}> X {this.props.item.qty}</Text>
            </View>
        )
    }
}