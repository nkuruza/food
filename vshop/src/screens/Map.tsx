import React, { Component, } from 'react';
import { View, TextInput, Picker, Text, TouchableHighlight } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';
import MapView, { Marker } from 'react-native-maps';
import LocationAPi from '../service/LocationApi';




export default class LocationSelector extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            marker: null
        }
    }
    signInComplete(): void {
        this.mapInit();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    mapInit() {


        let locapi = new LocationAPi();
        if (!this.state.marker)
            locapi.getLocation().then(location => {
                this.setState({ location: location });
            });
    }

    _pinDropped = (e) => {
        this.setState({ marker: { latlng: e.nativeEvent.coordinate } })
    }

    _onSelectPressed = () => {
        this.props.navigation.state.params.selectLocation(this.state.marker, this.state.location);
        this.props.navigation.pop();
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Select the location of your shop</Text>

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
                            }} style={styles.map}
                            onPress={this._pinDropped} >
                            {
                                this.state.marker ?
                                    <Marker key={1} coordinate={this.state.marker.latlng} />
                                    : null
                            }
                        </MapView> : null
                }
                <TouchableHighlight style={styles.button} onPress={this._onSelectPressed} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Select</Text>
                </TouchableHighlight>
            </View>

        )
    }
}