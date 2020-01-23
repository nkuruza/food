import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';

type Props = {};

export default class Product extends Component<any>{
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    _addToCart = () => {
        let item = this.props.navigation.state.params.item;
        this.props.navigation.state.params.addToCart(item, 1);
        this.props.navigation.pop();
    }
    render() {
        let item = this.props.navigation.state.params.item;
        return (
            <View>
                <Text>{item.name}</Text>
                <TouchableHighlight style={styles.button} onPress={this._addToCart} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add to cart</Text>
                </TouchableHighlight>
            </View>
        )
    }
}