import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { AuthenticationApi } from '../service/Authentication';


type Props = {};

export default class Market extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {

        let auth: AuthenticationApi = new AuthenticationApi();

        auth.signIn().then(token => {
            //console.log('Token', token);
            //console.log(auth.getUserInfo());
            auth.getUserInfo().then(info => {
                console.log('got user info', info)
            })
            console.log('got user info')
        })

        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
        })
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {
        this.props.navigation.navigate("Store", { shop: item, user: { id: 0 } });
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
    _merchantLogin = () => {
        this.props.navigation.navigate("Merchant");
    }
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