import React from 'react';
import { FlatList, View, TextInput, Picker, Text, TouchableHighlight } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import AuthenticatedScreen from './AuthenticatedScreen';
import MapView, { Marker } from 'react-native-maps';
import LocationAPi from '../service/LocationApi';




export default class UserDetails extends AuthenticatedScreen {
    signInComplete(): void {

    }

    constructor(props) {
        super(props);
        this.state = {
            userRole: "ROLE_CUSTOMER",
            shop: { name: "", address: "", lat: 0, lon: 0 },
            marker: null
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    _roleValueChanged = (value) => {
        this.setState({ userRole: value });
        console.log(this.state.shop)
        if (value == "ROLE_MERCHANT") {
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

    refresh() {

    }



    _onSavePressed = () => {
        let user = { role: this.state.userRole, shop: null };
        if (this.state.userRole == "ROLE_MERCHANT") {
            user.shop = this.state.shop;
        }
        FoodApi.newUser(user).then(response => {
            if (response > 0) {
                super.refreshToken().then(() => {
                    this.props.navigation.pop();
                });

            }
        })
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
                this.locationSelected(marker, location)
            }
        });
    }


    _logout = () => {
        super.logout();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>What will you be using VShop as?</Text>
                <Picker
                    selectedValue={this.state.userRole}
                    style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                    onValueChange={this._roleValueChanged}>

                    <Picker.Item label="Customer" value="ROLE_CUSTOMER" />
                    <Picker.Item label="Merchant" value="ROLE_MERCHANT" />
                </Picker>
                {
                    this.state.userRole == "ROLE_MERCHANT" ?
                        <TextInput
                            style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                            placeholder="Name of the shop"
                            onChangeText={this._nameValueChanged}
                            value={this.state.shop.name}
                        /> : null
                }
                {
                    this.state.userRole == "ROLE_MERCHANT" ?
                        <TextInput
                            style={{ height: 100, borderBottomWidth: 1, marginBottom: 10 }}
                            placeholder="Address"
                            multiline
                            numberOfLines={4}
                            onChangeText={this._addressValueChanged}
                            value={this.state.shop.address}
                        /> : null}
                {
                    this.state.userRole == "ROLE_MERCHANT" && this.state.location ?
                        <TouchableHighlight style={{ width: 80 }} onPress={this._onMapPressed} underlayColor='#99d9f4'>
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
                            </MapView>
                        </TouchableHighlight>
                        : null
                }

                <TouchableHighlight style={styles.button} onPress={this._onSavePressed} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={this._logout} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableHighlight>

            </View>

        )
    }
}