import React from 'react';
import { Component } from "react";
import { AuthenticationApi } from "../service/Authentication";
import { Base64 } from "../utils/Base64";
import { FoodApi } from "../service/FoodApi";
import { TouchableHighlight, Text } from "react-native";
import styles from '../style';

let AUTH: AuthenticationApi = AuthenticationApi.getInstance();

export default abstract class AuthenticatedScreen extends Component<any, any>{

    protected user: any;
    protected roles: string[] = [];
    protected token: any;
    protected title: string;

    willFocusSubscription: any

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <TouchableHighlight onPress={navigation.getParam('toggleMenu')} style={styles.headerButton}>
                    <Text>Menu</Text>
                </TouchableHighlight>)
        }
    }
    constructor(props) {
        super(props);
        this.props.navigation.setParams({ toggleMenu: this._toggleMenu });
    }

    componentDidMount() {
        AUTH.getCachedAuth().then(token => {
            if (token) this.completeSignIn(token.accessToken);
            else this.signIn();
        }).catch(error => {
            this.signIn();
        });

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.refresh();
            }
        );
    }
    componentWillUnmount() {
        if (this.willFocusSubscription)
            this.willFocusSubscription.remove();
    }

    refresh() {

    }

    signIn() {
        AUTH.signIn().then(token => {
            if (token) this.completeSignIn(token.accessToken);
        }).catch(e => console.log("FUCK", e));
    }

    async refreshToken() {
        let token = await AUTH.forceRefreshAuth();
        this.completeSignIn(token.accessToken);
    }


    completeSignIn(token) {
        let user = this.user = Base64.parseJwt(token);
        this.token = token;

        FoodApi.whoami().then(u => {
            this.user.id = u.id;
        }).catch((e) => {
            console.log(e);
            console.log("no whomai info at this point");
        });

        if (user.resource_access["vshop-server"])
            this.roles = user.resource_access["vshop-server"].roles;
        else
            this.roles = [];

        this.signInComplete();
    }
    hasRole(role: string): boolean {
        for (let i = 0; i < this.roles.length; i++)
            if (this.roles[i] == role)
                return true;
        return false;
    }
    getRole() {
        return this.roles.length > 0 ? this.roles[0] : null;
    }
    abstract signInComplete(): void;

    _toggleMenu = () => {
        this.setState({showMenu: !this.state.showMenu})
    }

    async logout() {
        let token = await AUTH.getCachedAuth();
        if (token)
            await AUTH.signOut(token);
        this.props.navigation.replace("Home");
    }
}