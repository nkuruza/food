import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class LocationAPi {
  

  constructor() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      /*this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });*/
      console.log("NEEDS DEVICE");
    } 
  }

  async getLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("NOT GRANTED")
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };  
}