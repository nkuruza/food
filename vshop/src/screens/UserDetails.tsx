import React, { Component, } from 'react';
import { FlatList, View, TextInput, Picker, Text } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import LocationAPi from '../service/LocationApi';




export default class UserDetails extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = {
            userRole: "ROLE_CUSTOMER",
            shop: {},
            marker: null
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    _roleValueChanged = (value) => {
        this.setState({ userRole: value });
        if (value == "ROLE_MERCHANT") {
            let locapi = new LocationAPi();
            locapi.getLocation().then(location => {
                this.setState({ location: location, marker: {latlng: location.coords} });
            });
        }
    }

    _pinDropped = (e) => {
        this.setState({ marker: { latlng: e.nativeEvent.coordinate } })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>What will you be using VShop as?</Text>
                <Picker
                    selectedValue={this.state.userRole}
                    style={{ height: 50 }}
                    onValueChange={this._roleValueChanged}>

                    <Picker.Item label="Customer" value="ROLE_CUSTOMER" />
                    <Picker.Item label="Merchant" value="ROLE_MERCHANT" />
                </Picker>
                {
                    this.state.userRole == "ROLE_MERCHANT" ?
                        <TextInput
                            style={{ height: 50 }}
                            placeholder="Name of the shop"
                            onChangeText={(text) => this.setState({ shop: { name: text } })}
                            value={this.state.shop.name}
                        /> : null}
                {
                    this.state.location ? <MapView
                        zoomEnabled={true}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }} style={styles.mapStyle}
                        onPress={this._pinDropped} >
                        {
                            this.state.marker ?
                                <Marker key={1} coordinate={this.state.marker.latlng} />
                                : null
                        }
                    </MapView> : null
                }


            </View>

        )
    }
}