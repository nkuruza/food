import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../style.js';

export default class MerchantItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render(){
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.merchant}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require('../img/roast.png')} style={styles.merchantAvi}/>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}