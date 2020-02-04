import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../style';
import { Shop } from '../model/Shop';

export interface MarketShopProps {
    shop: Shop;
    role?: string;
    onItemAction: {
        (item: Shop, action: string): void;
    }
}

export default class MarketShop extends React.PureComponent<MarketShopProps> {

    _onItemPressed = () => {
        this.props.onItemAction(this.props.shop, "view");
    }
    render() {
        return (
            <TouchableOpacity style={styles.marketShop} onPress={this._onItemPressed}>
                <View style={styles.marketShopImageContainer}>
                    <Image style={styles.marketShopImage} source={require('../img/roast.png')} />
                </View>
                <View style={{ marginLeft: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", }}>{this.props.shop.name}, {this.props.shop.address}</Text>
                    <Text>Category</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <Text style={styles.tagItem}>2km</Text>
                    <Text style={styles.tagItem}>3/5</Text>
                    <Text style={styles.tagItem}>20 - 30 minutes</Text>
                </View>
            </TouchableOpacity>
            );
        }
}