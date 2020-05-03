import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../style';
import { Common } from '../utils/Common';
import { ActionableItem } from '../model/ActionableItem';

const statusStyles = {
    "PLACED": styles.placed,
    "REJECTED": styles.rejected, 
    "ACCEPTED": styles.accepted, 
    "PREPARING": styles.preparing, 
    "READY": styles.ready, 
    "CUSTOMER COLLECTED": styles.customerAccepted
}

export default class CustomerOrderItem extends React.PureComponent<ActionableItem> {
    _onPress = () => {
        this.props.onItemAction(this.props.item, "view");
    }
    getOrderSummary(): string {
        let summary = "";
        for (let ol of this.props.item.orderLines) {
            if (summary.length != 0)
                summary += ", "
            summary += (`${ol.product.name} X ${ol.qty} @ R${Common.formatMoney(ol.unitPrice)}`)
        }

        return summary;
    }

    getOrderTotal(): number {
        let tot = 0;
        for (let ol of this.props.item.orderLines)
            tot += (ol.qty * ol.unitPrice)
        return tot;
    }
    render() {
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.merchantOrderItem}>
                <View style={{ flex: 2 }}>
                    <Text>{this.props.item.shop.name}</Text>
                </View>
                <View style={{ flex: 5 }}>
                    <Text>{this.getOrderSummary()}</Text>
                </View>
                <View style={{ ...statusStyles[this.props.item.status.type], ...styles.orderStatus }}>
                    <Text style={{ fontSize: 10 }}>{this.props.item.status.type}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 10 }}>R {Common.formatMoney(this.getOrderTotal())}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}