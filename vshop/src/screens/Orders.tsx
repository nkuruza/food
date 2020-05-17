import React from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { OrderLine } from '../model/OrderLine';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantOrderItem from '../component/MerchantOrderItem';


export default class Orders extends AuthenticatedScreen {
    
    signInComplete(): void {
        this.refresh();
    }
    refresh() {
        let shopId = this.props.navigation.getParam('shopId')
        FoodApi.listShopOrders(shopId).then(orders => {
            this.setState({ orders: orders });
        })
    }
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        super.componentDidMount();
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    _scanCode = () => {
        this.props.navigation.navigate("ScanCode");
    }

    getTotal(lines: OrderLine[]) {
        let total = 0;
        for (let i = 0; i < lines.length; i++)
            total += (lines[i].unitPrice * lines[i].qty);
        return total;
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )

    _viewOrder = (order) => {
        this.props.navigation.navigate("MerchantOrder", { order: order });
    }

    _renderItem = ({ item }) => (
        <MerchantOrderItem
            item={item}
            onItemAction={this._viewOrder}
        />
    )
    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._scanCode} style={styles.button}>
                    <Text style={styles.buttonText}>Scan Order</Text>
                </TouchableHighlight>
                <FlatList
                    data={this.state.orders}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => "item" + item.id}
                    ItemSeparatorComponent={this._itemSeparator}
                />
            </View>


        )
    }
}