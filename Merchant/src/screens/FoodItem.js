import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi.js';
import { ScrollView, FlatList, Switch } from 'react-native-gesture-handler';
import { StorageHelper } from '../service/Storage.js';

type Props = {};
const Form = t.form.Form;
const Product = t.struct({
    name: t.String,
    description: t.String,
    price: t.Number
});

export default class FoodItem extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { value: null, shopId: 0, subs: [] }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        let shopId = this.props.navigation.getParam('shopId');
        StorageHelper.get('food-items').then(items => {
            this.setState({ shopId: shopId, subs: items });
        });
    }
    onChange(value) {
        this.setState({ value: value });
    }
    _saveFood = () => {
        console.log(this.state.value)
        FoodApi.addShopItem(this.state.shopId, this.state.value).then(response => {
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
        <View style={{flex: 1}}>
            <Switch value={item.selected}></Switch>
            <Text>Item: {item.name}</Text>
        </View>
    )

    render() {
        return (
            <ScrollView>
                <Form ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    type={Product} />
                <Text>Sides</Text>

                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.subs}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />
                <TouchableHighlight style={styles.button} onPress={this._saveFood} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}