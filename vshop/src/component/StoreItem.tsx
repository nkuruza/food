import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { Product } from '../model/Product';

interface StoreItemProps {
    product: Product;
    role?: string;
    onProductItemAction: { (item: Product, action: string): void; }
}

export default class StoreItem extends React.PureComponent<StoreItemProps>{
    _onViewPressed = () => {
        this.props.onProductItemAction(this.props.product, "view");
    }
    _onEditPressed = () => {
        this.props.onProductItemAction(this.props.product, "edit");
    }
    _onDeletePressed = () => {
        this.props.onProductItemAction(this.props.product, "delete");
    }
    render() {
        return (
            <View style={styles.product}>
                <View style={styles.itemActionBar}>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onViewPressed}>
                        <Text style={styles.itemActionButtonText}>view</Text>
                    </TouchableOpacity>
                    {
                        this.props.role == "ROLE_MERCHANT" ?
                            <TouchableOpacity style={styles.itemActionButton} onPress={this._onEditPressed}>
                                <Text style={styles.itemActionButtonText}>edit</Text>
                            </TouchableOpacity>
                            : null}
                            {
                        this.props.role == "ROLE_MERCHANT" ?
                            <TouchableOpacity style={styles.itemActionButton} onPress={this._onDeletePressed}>
                                <Text style={styles.itemActionButtonText}>delete</Text>
                            </TouchableOpacity>
                            : null}
                </View>
                <View style={{ flexDirection: "row", borderWidth: 1, }}>
                    <Image source={require('../img/roast.png')} style={styles.merchantShopImage} />
                    <View style={styles.merchantShopDetails}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.props.product.name}</Text>
                        <Text>{this.props.product.description}</Text>
                    </View>
                </View>
            </View>
        );
    }
}