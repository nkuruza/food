import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style.js';

export default class MerchantItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render(){
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.merchant}>
                    <Image source={require('../img/roast.png')} style={styles.merchantAvi}/>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}