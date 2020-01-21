import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../style';

export default class StoreItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }
    render(){
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.product}>
                <View style={{ alignItems: "center" }}>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}