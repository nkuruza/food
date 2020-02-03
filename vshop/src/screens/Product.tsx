import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, Image } from 'react-native';
import styles from '../style';
import NumberInput from '../component/NumberInput'
import AuthenticatedScreen from './AuthenticatedScreen';

export default class Product extends AuthenticatedScreen {
    signInComplete(): void {
        //throw new Error("Method not implemented.");
    }
    constructor(props) {
        super(props);
        this.state = { count: 1 };
    }
    componentDidMount() {
        super.componentDidMount();
    }
    _addToCart = () => {
        let item = this.props.navigation.state.params.item;
        this.props.navigation.state.params.addToCart(item, this.state.count);
        this.props.navigation.pop();
    }
    render() {
        let item = this.props.navigation.state.params.item;
        return (
            <View>
                <Text>{item.name}</Text>
                <Image source={require('../img/roast.png')} style={styles.productImage} />
                <Text>{item.description}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text>X</Text>
                    <NumberInput value={this.state.count}></NumberInput>
                    <TouchableHighlight style={styles.button} onPress={this._addToCart} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Add to cart</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}