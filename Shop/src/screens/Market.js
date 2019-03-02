import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import  MerchantItem from '../component/MerchantItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';

export default class Market extends Component<Props>{
    
    
    constructor(props) {
        super(props);
        this.state = { products: [] }
    }

    componentDidMount(){
        FoodApi.getMerchants(3).then( response => {
            console.log(response);
            this.setState({merchants: response});
        })
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { Store: item });
    }

    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = ({ item }) => (
        <MerchantItem
            item={item}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    )
    render() {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}