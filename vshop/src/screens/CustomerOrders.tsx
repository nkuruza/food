import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { OrderLine } from '../model/OrderLine';
import AuthenticatedScreen from './AuthenticatedScreen';
import MerchantOrderItem from '../component/MerchantOrderItem';
import CustomerOrderItem from '../component/CustomerOrderItem';


export default class CustomerOrders extends AuthenticatedScreen {
    static navigationOptions = ({}) => {
        return {
            title: "Orders"
        }
    }
    signInComplete(): void {
        this.refresh();
    }
    refresh() {
        
        FoodApi.listCustomerOrders().then(orders => {
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
        this.props.navigation.navigate("CustomerOrder", { order: order });
    }

    _renderItem = ({ item }) => (
        <CustomerOrderItem
            item={item}
            onItemAction={this._viewOrder}
        />
    )
    render() {
        return (
            <FlatList
                data={this.state.orders}
                renderItem={this._renderItem}
                keyExtractor={(item) => "item" + item.id}
                ItemSeparatorComponent={this._itemSeparator}
            />

        )
    }
}