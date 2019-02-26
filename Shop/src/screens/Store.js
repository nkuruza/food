import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { StoreItem } from '../component/StoreItem'


export default class Store extends Component<Props>{
    _keyExtractor = (item, index) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("ViewProduct", { product: item });
    };

    constructor(props) {
        super(props);
        this.state = { products: [] }
    }
    _createItem = () => {
        this.props.navigation.navigate("FoodItem", {mode : "create"});
    }
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    );
    _renderItem = ({ item }) => (
        <StoreItem
            player={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    );
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._createItem} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}