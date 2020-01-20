import React, { Component, } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import MerchantItem from '../component/MerchantItem';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { AuthenticationApi } from '../service/Authentication';
import { Base64 } from '../utils/Base64';
import { Props } from '../utils/Common';




export default class Home extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {

        let auth: AuthenticationApi = AuthenticationApi.getInstance();

        auth.signIn().then(token => {
            //console.log('Token', token);
            //console.log(auth.getUserInfo());
            let user = Base64.parseJwt(token.accessToken);
            console.log('user', user);
            console.log('user1', user.resource_access["vshop-server"].roles[0]);
            if (user.resource_access["vshop-server"].roles[0] == "ROLE_MERCHANT")
                this.props.navigation.navigate("Merchant");
            else
                this.props.navigation.navigate("Market");

        })

        FoodApi.listShops().then(response => {
            this.setState({ shops: response });
        })
    }

    _keyExtractor = (item) => `item-${item.id}`;

    _onPressItem = (item) => {

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

    _customerLogin = () => {
        this.props.navigation.navigate("Market");
    }
    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button} onPress={this._merchantLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Merchant Login</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._merchantLogin} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Customer Login</Text>
                </TouchableHighlight>
                <FlatList
                    ItemSeparatorComponent={this._itemSeparator}
                    data={this.state.shops}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem} />

            </View>

        )
    }
}