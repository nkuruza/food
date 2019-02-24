import React, { Component } from 'react';

export default class Store extends Component<Props>{
    _keyExtractor = (item, index) => `palyer-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("ViewProduct", { product: item });
    };

    constructor(props) {
        super(props);
        this.state = { products: [] }
    }
    _itemSeparator = () => (
        <View style={{ borderWidth: 1, borderColor: '#222', width: '86%', marginLeft: '7%' }} />
    );
    _renderItem = ({ item }) => (
        <PlayerListItem
            player={item}
            onPressItem={this._onPressItem}
            title={item.name}
            challenge={item.challenge}
        />
    );
    render() {
        return (
            <FlatList
                ItemSeparatorComponent={this._itemSeparator}
                data={this.state.products}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />
        )
    }
}