import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, ScrollView } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';
import CartItem from '../component/CartItem';
import { Order } from '../model/Order';
import { FoodApi } from '../service/FoodApi';

let renderHeader = (status, nextStatus, rejectOrder, collect) => {

    if (status == 'PLACED')
        return (<View style={styles.headerRight}>

            <TouchableHighlight onPress={rejectOrder} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>Reject</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={nextStatus} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>{STATUS_MAP[status].label}</Text>
            </TouchableHighlight>
        </View>);

    if (status == 'ACCEPTED' || status == 'PREPARING' || (collect && status == 'READY'))
        return (<View style={styles.headerRight}>

            <TouchableHighlight onPress={nextStatus} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>{STATUS_MAP[status].label}</Text>
            </TouchableHighlight>
        </View>);


}

const STATUS_MAP = {
    "PLACED": { next: "ACCEPTED", label: "Accept" },
    "ACCEPTED": { next: "PREPARING", label: "Start Perparing" },
    "PREPARING": { next: "READY", label: "Ready" },
    "READY": { next: "CUSTOMER_ACCEPTED", label: "Customer Collect" },
}

export default class MerchantOrder extends AuthenticatedScreen {
    static navigationOptions = ({ navigation }) => {
        // refactor this nonsense
        let order: Order = navigation.getParam('order');
        let nextStatus = navigation.getParam('nextStatus');
        let rejectOrder = navigation.getParam('rejectOrder');
        let collect = navigation.getParam('collect');
        let username = order.customer.username;
        let title: string = `${username}'${username.endsWith('s') ? '' : 's'} order`;



        return {
            headerRight: renderHeader(order.status.type, nextStatus, rejectOrder, collect),
            title: title
        }
    }
    signInComplete(): void {
        //throw new Error("Method not implemented.");
    }
    constructor(props) {
        super(props);
        this.state = { order: { shop: {} } };
        this.props.navigation.setParams(
            {
                nextStatus: this._nextStatus,
                rejectOrder: this._rejectOrder
            }
        );
    }
    componentDidMount() {
        super.componentDidMount();
        let order = this.props.navigation.getParam("order");
        console.log(order);
        this.setState({ order: order });
    }
    _nextStatus = () => {
        this.setStatus(STATUS_MAP[this.state.order.status.type].next)
    }

    _rejectOrder = () => {
        this.setStatus("REJECTED")
    }

    _prepare = () => {
        this.setStatus("PREPARING")
    }

    _ready = () => {
        this.setStatus("READY")
    }

    setStatus(status: string) {
        FoodApi.updateOrderStatus({ orderId: this.state.order.id, status: status }).then(response => {
            this.setState({ order: response })
            this.props.navigation.setParams({ order: response });
            if (response.status.type == "CUSTOMER_ACCEPTED")
                this.props.navigation.pop();
        }).catch(e => console.log(e));
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _keyExtractor = (item) => `item-${item.id}`;

    _renderItem = ({ item }) => (
        <CartItem
            item={item}
        />
    )
    render() {
        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        let total = 0;
        if (this.state.order.orderLines) {
            for (let line of this.state.order.orderLines)
                total += (line.qty * line.product.price)
        }
        let name = this.state.order.shop.name;
        let dateCreated = new Date(this.state.order.dateCreated).toLocaleDateString('en-za', dateOptions);
        let status = this.state.order.status ? this.state.order.status.type : '';
        return (
            <View>
                <Text>{name}</Text>
                <Text>{dateCreated}</Text>
                <Text>{status}</Text>

                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.order.orderLines}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

                <Text>TOTAL: R {total}</Text>
            </View>
        )
    }
}