import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Switch, ScrollView } from 'react-native';
import styles from '../style';
import { StorageHelper } from '../service/Storage';
import { Props } from '../utils/Common';


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
        /*FoodApi.addShopItem(this.state.shopId, this.state.value).then(response => {
            console.log(response);
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
        });*/
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