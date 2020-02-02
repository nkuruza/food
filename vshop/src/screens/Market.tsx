import React from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantShop from '../component/MerchantShop';





export default class Market extends AuthenticatedScreen{
    signInComplete(): void {
        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
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
        <MerchantShop
            shop={item}
            onMerchantShopItemAction={this._onPressItem}
        />
    )
    render() {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}