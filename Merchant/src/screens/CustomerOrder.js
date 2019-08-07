import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import CartItem from '../component/CartItem';
import styles from '../style';


type Props = {};

export default class CustomerOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { order: { shop: {} } };
    }
    componentDidMount() {
        let order = this.props.navigation.getParam("order");
        console.log(order)
        this.setState({ order: order });
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <CartItem
            item={item}
            onPressItem={this._onPressItem}
        />
    )
    render() {
        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        let total = 0;
        if (this.state.order.orderLines) {
            for (line of this.state.order.orderLines)
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
                    renderItem={this._renderItem} />
                <View>
                    <Text>{total}</Text>
                </View>
            </ScrollView>
        )
    }
}