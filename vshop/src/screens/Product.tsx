import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, Image } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Product extends AuthenticatedScreen {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('item').name
        }
    }

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

    _stepUp = () => {
        this.setState({ count: this.state.count + 1 });
    }

    _stepDown = () => {
        if (this.state.count > 1)
            this.setState({ count: this.state.count - 1 });
    }

    render() {
        let item = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <Text>{item.description}</Text>
                <View style={{ flexDirection: "row", paddingBottom: 10, paddingTop: 10, alignItems: "center", justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.productStepDown} onPress={this._stepDown}><Text style={styles.productStepText}>-</Text></TouchableOpacity>
                    <Text style={styles.counterText}>{this.state.count}</Text>
                    <TouchableOpacity style={styles.productStepUp} onPress={this._stepUp}><Text style={styles.productStepText}>+</Text></TouchableOpacity>
                </View>
                <TouchableHighlight style={styles.button} onPress={this._addToCart} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add to cart</Text>
                </TouchableHighlight>
            </View>
        )
    }
}