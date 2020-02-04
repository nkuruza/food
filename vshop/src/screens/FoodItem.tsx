import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Switch, ScrollView, TextInput } from 'react-native';
import styles from '../style';
import { StorageHelper } from '../service/Storage';
import AuthenticatedScreen from './AuthenticatedScreen';
import { FoodApi } from '../service/FoodApi';


export default class FoodItem extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = { item: { name: "", description: "", price: "0" }, shopId: 0, subs: [] } 
    }
    signInComplete(): void {

    }
    componentDidMount() {
        super.componentDidMount();
        let shopId = this.props.navigation.getParam('shopId');
        StorageHelper.get('food-items').then(items => {
            this.setState({ shopId: shopId, subs: items });
        });
    }

    _nameValueChanged = (value) => {
        this.setState(prevState => {
            let item = Object.assign({}, prevState.item);
            item.name = value;
            return { item };
        });
    }

    _descriptionValueChanged = (value) => {
        this.setState(prevState => {
            let item = Object.assign({}, prevState.item);
            item.description = value;
            return { item };
        });
    }

    _priceValueChanged = (value) => {
        this.setState(prevState => {
            let item = Object.assign({}, prevState.item);
            item.price = value;
            return { item };
        });
    }
    _saveFood = () => {
        FoodApi.addShopItem(this.state.shopId, this.state.item).then(response => {
            console.log(response);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });
    }
    _keyExtractor = item => `item-${item.id}`;
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )
    _renderItem = (item) => (
        <View style={{ flex: 1 }}>
            <Switch value={item.selected}></Switch>
            <Text>Item: {item.name}</Text>
        </View>
    )

    render() {
        return (
            <ScrollView>

                <TextInput
                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Name"
                    onChangeText={this._nameValueChanged}
                    value={this.state.item.name}
                />
                <TextInput
                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Description"
                    onChangeText={this._descriptionValueChanged}
                    value={this.state.item.description}
                />
                <TextInput

                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Price"
                    onChangeText={this._priceValueChanged}
                    value={this.state.item.price}
                />

                <Text>Sides</Text>

                {/*<FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.subs}
                    keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />*/}
                <TouchableHighlight style={styles.button} onPress={this._saveFood} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}