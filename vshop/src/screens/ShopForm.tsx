import React, { Component } from 'react';
import { FlatList, View, TouchableHighlight, Text, TextInput, Image, Dimensions } from 'react-native';
import styles from '../style';
import { FoodApi } from '../service/FoodApi';
import { Props } from '../utils/Common'
import AuthenticatedScreen from './AuthenticatedScreen';
import MapView, { Marker } from 'react-native-maps';
import LocationAPi from '../service/LocationApi';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class ShopForm extends AuthenticatedScreen {
    constructor(props: Props) {
        super(props);
        this.state = {
            location: null,
            shop: { name: "", address: "", lon: 0, lat: 0, image: null },
            marker: null,
            step: 0
        }
    }
    private aspectX: number = 16;
    private aspectY: number = 7;

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
            if (response && response.id > 0) {
                this.props.navigation.state.params.listShops();
                this.props.navigation.pop();
            }

        })
    }

    _onNextPressed = () => {
        this.setState({ step: this.state.step + 1 });
    }

    _onPrevPressed = () => {
        this.setState({ step: this.state.step - 1 });
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [16, 7],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState(prevState => {
                    let shop = Object.assign({}, prevState.shop);
                    shop.image = result.uri;
                    return { shop };
                });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        const { image } = this.state.shop;
        console.log("IMAGE", image)
        return (
            <View style={styles.container}>
                {
                    this.state.step == 0 ?
                        <View style={{ flexDirection: "column" }}>
                            <TextInput
                                style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                                placeholder="Name of the shop"
                                onChangeText={this._nameValueChanged}
                                value={this.state.shop.name}
                            />
                            <View style={{
                                height: this.aspectY * (Dimensions.get("window").width - 40) / this.aspectX,
                                width: Dimensions.get("window").width - 40,
                                backgroundColor: "#eee",
                                borderWidth: 0.5,
                                borderColor: "#red",
                                marginBottom: 5
                            }}>
                                {image ? (
                                    <Image source={{ uri: image }} style={{ flex: 1 }} />
                                ) : (
                                        <View />
                                    )}
                            </View>
                            <TouchableHighlight style={styles.button} onPress={this._pickImage} underlayColor='#99d9f4'>
                                <Text style={styles.buttonText}>Select Image</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.button} onPress={this._onNextPressed} underlayColor='#99d9f4'>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableHighlight>
                        </View>
                        : null
                }

                {
                    this.state.step == 1 ?
                        <View>
                            <TextInput
                                style={{ height: 40, borderBottomWidth: 1, marginBottom: 10 }}
                                placeholder="Address"
                                onChangeText={this._addressValueChanged}
                                value={this.state.shop.address}
                            />
                            <TouchableHighlight style={styles.button} onPress={this._onMapPressed} underlayColor='#99d9f4'>
                                <Text style={styles.buttonText}>Select location</Text>
                            </TouchableHighlight>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableHighlight style={styles.button} onPress={this._onPrevPressed} underlayColor='#99d9f4'>
                                    <Text style={styles.buttonText}>Prev</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.button} onPress={this._onSavePressed} underlayColor='#99d9f4'>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableHighlight>
                            </View>
                        </View> : null
                }
            </View>
        );
    }
}