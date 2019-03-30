import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
type Props = {};

export default class Cart extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        let data = this.props.navigation.getParam('cart'); this.setState({ data: data });
    }
    _keyExtractor = (item) => `item-${item.product.id}`;

    _onPressItem = (item) => {
        //this.props.navigation.navigate("Store", { store: item });
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <CartItem
            item={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    )
    render() {
        let total = 0;
        console.log(this.state.data)

        for(item of this.state.data)
            total += item.product.price;
        return (
            <ScrollView>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Place Order for R {total}</Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}