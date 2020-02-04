import React from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';
import MarketShop from '../component/MarketShop';





export default class Market extends AuthenticatedScreen{
    signInComplete(): void {
        //TODO get the location of the user before listing shops... List shops by radius.
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
        this.props.navigation.navigate("MarketShop", { store: item, user: { id: 0 } });
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MarketShop
            shop={item}
            onItemAction={this._onPressItem}
        />
    )
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}