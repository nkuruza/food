import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { ActionableItem } from '../model/ActionableItem';


export default class MerchantShop extends React.PureComponent<ActionableItem> {
    componentDidMount(){
        //FoodApi.getImage(this.props.item)
    }
    _onViewPressed = () => {
        this.props.onItemAction(this.props.item, "view");
    }
    _onOrdersPressed = () => {
        this.props.onItemAction(this.props.item, "orders");
    }
    _onEditPressed = () => {
        this.props.onItemAction(this.props.item, "edit");
    }
    render() {
        return (
            <View style={styles.shop}>
                <View style={styles.itemActionBar}>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onViewPressed}>
                        <Text style={styles.itemActionButtonText}>view</Text>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onOrdersPressed}>
                        <Text style={styles.itemActionButtonText}>{this.props.item.orders.length} order{this.props.item.orders.length != 1 ? "s" : ""}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemActionButton} onPress={this._onOrdersPressed}>
                        <Text style={styles.itemActionButtonText}>edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", borderWidth: 1, }}>
                    <Image source={{ uri: `https://dev.asandasystems.co.za/food-service/files/download/${this.props.item.shop.image}`, headers: {Authorization: "Bearer " + this.props.item.shop.token} }} style={styles.merchantShopImage} />
                    <View style={styles.merchantShopDetails}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.props.item.shop.name}</Text>
                        <Text>{this.props.item.shop.address}</Text>
                    </View>
                </View>
            </View>

        );
    }
}