import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';





export default class Market extends AuthenticatedScreen{
    signInComplete(): void {
        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
            console.log(response)
        });
    }

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { store: item, user: { id: 0 } });
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
                <Text>Marekt, yay</Text>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}