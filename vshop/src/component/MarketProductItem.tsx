import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { Product } from '../model/Product';

interface MarketProductItemProps {
    product: Product;
    role?: string;
    onItemAction: { (item: Product, action: string): void; }
}

export default class MarketProductItem extends React.PureComponent<MarketProductItemProps>{
    _onPressed = () => {
        this.props.onItemAction(this.props.product, "view");
    }
    render() {
        return (
            <TouchableOpacity style={{ paddingBottom: 30, paddingTop: 10 }} onPress={this._onPressed}>
                <Text style={{ fontSize: 18, }}>{this.props.product.name}</Text>
                <Text>{this.props.product.description}</Text>
                <Text style={{ fontSize: 18, }}>{this.props.product.price}</Text>
            </TouchableOpacity>
        );
    }
}