import React, { Component, } from 'react';
import { FlatList, View, TouchableHighlight, Text } from 'react-native';
import styles from '../style';
import AuthenticatedScreen from './AuthenticatedScreen';




export default class Home extends AuthenticatedScreen {

    constructor(props) {
        super(props);
        this.state = { shops: [] }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    referesh(){
        this.signIn();
    }



    signInComplete() {
        if (this.roles.length == 0) {
            this.props.navigation.replace("UserDetails")
            return
        };

        if (this.roles[0] == "ROLE_MERCHANT")
            this.props.navigation.replace("Merchant");
        else if (this.roles[0] == "ROLE_CUSTOMER")
            this.props.navigation.replace("Market");
        else
            console.log("Fuck")

    }
    render() {
        return (
            <View/>

        )
    }
}