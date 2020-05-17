import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle } from "react-native";
import style from '../style';

interface MenuProps {
    role: string;
    onAction: {
        (item: any, action: string): void;
    }
}

export default class Menu extends React.PureComponent<MenuProps>{
    _onHomePressed = () => {

    }
    _onNotificationsPressed = () => {

    }
    _onMessagesPressed = () => {

    }
    _onOrdersPressed = () => {

    }
    _onProfilePressed = () => {

    }
    _onShopsPressed = () => {

    }

    _onLogoutPressed = () => {
        this.props.onAction("logout", "pressed");
    }
    render() {
        return (
            <View style={{ flex: 1, paddingLeft: 3, paddingRight: 3 }}>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Home</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Notifications</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Messages</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Orders</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Profile</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Shops</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onLogoutPressed} style={style.menuItem}>
                    <Ionicons style={style.menuItemIcon} name="md-notifications" size={20} color="green" />
                    <Text style={{ flex: 4 }}>Logout</Text>
                    <Text style={style.menuItemCount}>2</Text>
                </TouchableOpacity>
            </View>
        );
    }
}