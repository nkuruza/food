import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, ScrollView } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';
import CartItem from '../component/CartItem';
import { Order } from '../model/Order';
import { FoodApi } from '../service/FoodApi';

let renderHeader = (status, acceptOrder, rejectOrder, prepare, ready) => {
    if (status == 'PLACED')
        return (<View style={styles.headerRight}>

            <TouchableHighlight onPress={rejectOrder} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>Reject</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={acceptOrder} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>Accept</Text>
            </TouchableHighlight>
        </View>);

    if (status == 'ACCEPTED')
        return (<View style={styles.headerRight}>

            <TouchableHighlight onPress={prepare} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>Start Preparing</Text>
            </TouchableHighlight>
        </View>);
    if (status == 'PREPARING')
        return (<View style={styles.headerRight}>

            <TouchableHighlight onPress={ready} style={styles.headerButton}>
                <Text style={{ fontSize: 12 }}>Ready</Text>
            </TouchableHighlight>
        </View>);
}

export default class MerchantOrder extends AuthenticatedScreen {
    static navigationOptions = ({ navigation }) => {
        let order: Order = navigation.getParam('order');
        let acceptOrder = navigation.getParam('acceptOrder');
        let rejectOrder = navigation.getParam('rejectOrder');
        let prepare = navigation.getParam('prepare');
        let ready = navigation.getParam('ready');
        let username = order.customer.username;
        let title: string = `${username}'${username.endsWith('s') ? '' : 's'} order`;



        return {
            headerRight: renderHeader(order.status.type, acceptOrder, rejectOrder, prepare, ready),
            title: title
        }
    }
    signInComplete(): void {
        //throw new Error("Method not implemented.");
    }
    constructor(props) {
        super(props);
        this.state = { order: { shop: {} } };
        this.props.navigation.setParams({ acceptOrder: this._acceptOrder })
        this.props.navigation.setParams({ rejectOrder: this._rejectOrder })
        this.props.navigation.setParams({ prepare: this._prepare })
        this.props.navigation.setParams({ ready: this._ready })
    }
    componentDidMount() {
        super.componentDidMount();
        let order = this.props.navigation.getParam("order");
        console.log(order);
        this.setState({ order: order });
    }
    _acceptOrder = () => {
        this.setStatus("ACCEPTED")
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
            this.setState({order: response})
            this.props.navigation.setParams({order: response});
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
            <ScrollView>
                <Text>{name}</Text>
                <Text>{dateCreated}</Text>
                <Text>{status}</Text>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.order.orderLines}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
                <View>
                    <Text>TOTAL: R {total}</Text>
                </View>
            </ScrollView>
        )
    }
}