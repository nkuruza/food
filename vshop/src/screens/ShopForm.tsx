import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, TextInput } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { Props } from '../utils/Common'
import AuthenticatedScreen from './AuthenticatedScreen';
import MapView, { Marker } from 'react-native-maps';
import LocationAPi from '../service/LocationApi';


export default class ShopForm extends AuthenticatedScreen {
    constructor(props: Props) {
        super(props);
        this.state = {
            location: null,
            shop: { name: "", address: "", lon: 0, lat: 0 },
            marker: null
        }
    }

    signInComplete(): void {
        this.getMap();
    }

    getMap() {
        let locapi = new LocationAPi();

        locapi.getLocation().then(location => {
            this.setState(prevState => {
                let location = Object.assign({}, prevState.location);
                location = prevState.location;
                return { location };
            })
            this.setState({ location: location });
        });
    }

    _nameValueChanged = (value) => {
        this.setState(prevState => {
            let shop = Object.assign({}, prevState.shop);
            shop.name = value;
            return { shop };
        })
    }

    _addressValueChanged = (value) => {
        this.setState(prevState => {
            let shop = Object.assign({}, prevState.shop);
            shop.address = value;
            return { shop };
        });
    }

    locationSelected(marker, location) {
        this.setState(prevState => {
            let shop = Object.assign({}, prevState.shop);
            shop.lon = marker.latlng.longitude;
            shop.lat = marker.latlng.latitude;
            return { shop };
        });
        this.setState({ marker: marker, location: location });

    }

    _onMapPressed = () => {
        this.props.navigation.navigate("Map", {
            selectLocation: (marker, location) => {
                console.log(marker)
                this.locationSelected(marker, location);
            }
        });
    }

    _onSavePressed = () => {
        FoodApi.saveShop(this.state.shop).then(response => {
            console.log(response);
            if(response && response.id > 0){
                this.props.navigation.state.params.listShops();
                this.props.navigation.pop();
            }

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Name of the shop"
                    onChangeText={this._nameValueChanged}
                    value={this.state.shop.name}
                />
                <TextInput
                    style={{ height: 100, borderBottomWidth: 1, marginBottom: 10 }}
                    placeholder="Address"
                    multiline
                    numberOfLines={4}
                    onChangeText={this._addressValueChanged}
                    value={this.state.shop.address}
                />
                <TouchableHighlight style={{ width: 80 }} onPress={this._onMapPressed} underlayColor='#99d9f4'>
                    {
                        this.state.location ?
                            <MapView
                                zoomEnabled={true}
                                showsUserLocation={true}
                                initialRegion={{
                                    latitude: this.state.location.coords.latitude,
                                    longitude: this.state.location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }} style={styles.mapThumbnail}>
                                {
                                    this.state.marker ?
                                        <Marker key={1} coordinate={this.state.marker.latlng} />
                                        : null
                                }
                            </MapView> : <Text>Select Shop Location</Text>
                    }
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._onSavePressed} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}