import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';

type Props = {};

export default class Market extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {
        FoodApi.listShops().then(response => {
            //console.log(response);
            this.setState({ shops: response });
        })
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { store: item });
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MerchantItem
            item={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    )
    _merchantLogin = () => {
        this.props.navigation.navigate("Merchant");
    }
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._merchantLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Merchant Login</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}