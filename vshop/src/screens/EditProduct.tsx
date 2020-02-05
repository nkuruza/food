import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Switch, ScrollView, TextInput } from 'react-native';
import styles from '../style';
import { StorageHelper } from '../service/Storage';
import AuthenticatedScreen from './AuthenticatedScreen';
import { FoodApi } from '../service/FoodApi';


export default class EditProduct extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = { product: this.props.navigation.getParam('product') }; 
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
            let product = Object.assign({}, prevState.product);
            product.name = value;
            return { product };
        });
    }

    _descriptionValueChanged = (value) => {
        this.setState(prevState => {
            let product = Object.assign({}, prevState.product);
            product.description = value;
            return { product };
        });
    }

    _priceValueChanged = (value:any) => {
        this.setState(prevState => {
            let product = Object.assign({}, prevState.product);
            product.price = value;
            return { product };
        });
    }
    _saveFood = () => {
        FoodApi.updateShopItem(this.state.product).then(response => {
            console.log(response);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.pop();
        }).catch(e => console.log("FUCK EDIT PRODUCT: ", e));
    }
    _keyExtractor = product => `product-${product.id}`;
    _itemSeparator = () => (
        <View style={styles.itemSeparator} />
    )

    render() {
        return (
            <ScrollView style={{paddingRight: 10, paddingLeft: 10}}>

                <TextInput
                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Name"
                    onChangeText={this._nameValueChanged}
                    value={this.state.product.name}
                />
                <TextInput
                    style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Address"
                    multiline
                    numberOfLines={4}
                    onChangeText={this._descriptionValueChanged}
                    value={this.state.product.description}
                />
                <TextInput

                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Price"
                    onChangeText={this._priceValueChanged}
                    value={this.state.product.price + ""}
                />
                <TouchableHighlight style={styles.button} onPress={this._saveFood} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}