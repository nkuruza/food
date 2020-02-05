import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { Shop } from '../model/Shop';
import { Order } from '../model/Order';

export interface MerchantShopProps {
    shop: Shop;
    role?: string;
    orders?: Order[];
    onMerchantShopItemAction: {
        (item: Shop, action: string): void;
    }
}

export default class MerchantShop extends React.PureComponent<MerchantShopProps> {
    _onViewPressed = () => {
        this.props.onMerchantShopItemAction(this.props.shop, "view");
    }
    _onOrdersPressed = () => {
        this.props.onMerchantShopItemAction(this.props.shop, "orders");
    }
    _onEditPressed = () => {
        this.props.onMerchantShopItemAction(this.props.shop, "edit");
    }
    render() {
        return (
            <View style={styles.shop}>
                <View style={styles.itemActionBar}>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onViewPressed}>
                        <Text style={styles.itemActionButtonText}>view</Text>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onOrdersPressed}>
                        <Text style={styles.itemActionButtonText}>{this.props.orders.length} order{this.props.orders.length != 1 ? "s" : ""}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onOrdersPressed}>
                        <Text style={styles.itemActionButtonText}>edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", borderWidth: 1, }}>
                    <Image source={require('../img/roast.png')} style={styles.merchantShopImage} />
                    <View style={styles.merchantShopDetails}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.props.shop.name}</Text>
                        <Text>{this.props.shop.address}</Text>
                    </View>
                </View>
            </View>

        );
    }
}