import React from 'react';
import { FlatList, View, TouchableOpacity, TouchableHighlight, Text, BackHandler } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';
import MarketShop from '../component/MarketShop';





export default class Market extends AuthenticatedScreen {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    <TouchableHighlight onPress={navigation.getParam('orders')} style={styles.headerButton}>
                        <Text>View Orders</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={navigation.getParam('logout')} style={styles.headerButton}>
                        <Text>Logout</Text>
                    </TouchableHighlight>
                </View>
            ),
            title: 'Market'
        }
    }
    signInComplete(): void {
        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
        });

    }

    constructor(props) {
        super(props);
        this.state = { shops: [] };
        this.props.navigation.setParams({ orders: this._viewOrders });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    _viewOrders = () => {
        this.props.navigation.navigate("CustomerOrders");
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
            item={item}
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