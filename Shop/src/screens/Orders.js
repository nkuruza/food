import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import CartItem from '../component/CartItem';
import styles from '../style.js';
import { FoodApi } from '../service/FoodApi';
import { CartService } from '../service/CartService';
import { StorageHelper } from '../service/Storage';
type Props = {};

export default class Orders extends Component<Props>{
    constructor(props) {
        super(props);
        this.state = { data: [], user: null };
        this.props.navigation.setParams({ clearCart: this._clearCart })
    }
    componentDidMount() {
        StorageHelper.get("orders").then(orders => {

        })
    }
}