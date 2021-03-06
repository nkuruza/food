import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SectionList, FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { StorageHelper } from '../service/Storage';
import OrderItem from '../component/OrderItem';
import OrderLineItem from '../component/OrderLineItem';
import { Common } from '../utils/Common';
type Props = {};

const statusStyles = [styles.placed, styles.viewed, styles.accepted, styles.preparing, styles.ready, styles.customerAccepted]

export default class Orders extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { data: [], user: null };
    }
    componentDidMount() {
        StorageHelper.get("orders").then(orders => {
            for (let i = 0; i < orders.length; i++)
                orders[i].data = orders[i].orderLines;
            this.setState({ data: orders });
        })
    }

    getTotal(lines) {
        let total = 0;
        for (line of lines)
            total += (line.unitPrice * line.qty);
        return total;
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderSectionHeader = ({ section }) => (
        <View style={styles.orderHeader}>
            <Text style={styles.orderCustomer}>{section.customer.firstName}</Text>
            <Text style={{ ...statusStyles[section.status.id - 1], ...styles.orderStatus }}>{section.status.type}</Text>
        </View>

    )
    _renderSectionFooter = ({ section }) => (
        <View style={styles.orderFooter}>
            <Text style={styles.orderTotal}>R {Common.formatMoney(this.getTotal(section.orderLines))}</Text>
            <TouchableHighlight style={styles.orderFooterButton}><Text style={{ alignSelf: 'center' }}>View</Text></TouchableHighlight>
        </View>
    )
    _renderItem = ({ item, index, section }) => (
        <OrderLineItem
            item={item}
            onPressItem={this._onPressItem}
        />
    )
    render() {
        return (
            <SectionList
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                renderSectionFooter={this._renderSectionFooter}
                sections={this.state.data}
                keyExtractor={(item, index) => "item" + index}
            />

        )
    }
}