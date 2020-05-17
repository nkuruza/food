import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../style';
import { ActionableItem } from '../model/ActionableItem';
import { FoodApi } from '../service/FoodApi';
import { Common } from '../utils/Common';

export default class MarketShop extends React.PureComponent<ActionableItem> {

    _onItemPressed = () => {
        this.props.onItemAction(this.props.item, "view");
    }
    render() {
        return (
            <TouchableOpacity style={styles.marketShop} onPress={this._onItemPressed}>
                <View style={styles.marketShopImageContainer}>
                    <Image style={styles.marketShopImage} source={{ uri: FoodApi.getImageUrl(this.props.item.image), headers: { Authorization: "Bearer " + this.props.item.token } }} />
                </View>
                <View style={{ marginLeft: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", }}>{this.props.item.name}, {this.props.item.address}</Text>
                    <Text>Category</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <Text style={styles.tagItem}>{Common.formatDistance(this.props.item.distance)}</Text>
                    <Text style={styles.tagItem}>6/10</Text>
                    <Text style={styles.tagItem}>20 - 30 minutes</Text>
                </View>
            </TouchableOpacity>
            );
        }
}