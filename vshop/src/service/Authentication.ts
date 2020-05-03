import { AsyncStorage } from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { Common, MediaType } from '../utils/Common';
import { checkStatus } from '../utils/apiUtils';

const config = {
    issuer: 'https://auth.asandasystems.co.za/auth/realms/virtual-shop',
    scopes: ['openid', 'profile', 'roles'],
    clientId: 'vshop-server',
    revocationEndpoint: 'https://auth.asandasystems.co.za/auth/realms/virtual-shop/protocol/openid-connect/logout'
};


const StorageKey = '@Security:KeycloakOAuthKey';

export class AuthenticationApi {

    private static auth: AuthenticationApi;

    private constructor() {

    }

    public static getInstance() {
        if (this.auth == null)
            this.auth = new AuthenticationApi();
        return this.auth;
    }

    async signIn() {
        const authState = await AppAuth.authAsync(config);
        await this.cacheAuth(authState);
        //console.log('signInAsync', authState);
        return authState;
    }


    cacheAuth(authState) {
        return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
    }

    async getCachedAuth() {
        const value = await AsyncStorage.getItem(StorageKey);
        const authState = JSON.parse(value);
        if (authState) {
            try {
                if (this.checkIfTokenExpired(authState)) {
                    return this.refreshAuth(authState);
                } else {
                    return authState;
                }
            }
            catch (error) {
                console.log("getCachedAuth", error)
                throw error;
            }

        }
        return null;
    }

    checkIfTokenExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
    }

    async forceRefreshAuth() {
        const value = await AsyncStorage.getItem(StorageKey);
        const authState = JSON.parse(value);
        return this.refreshAuth(authState);
    }

    async refreshAuth({ refreshToken }) {
        try {
            const authState = await AppAuth.refreshAsync(config, refreshToken);
            //console.log('refreshAuth', authState);
            await this.cacheAuth(authState);
            return authState;
        }
        catch (error) {
            console.log('error', error)
            throw error;
        }

    }

    async logout(token, refreshToken): Promise<boolean> {

        let contentType = 'application/x-www-form-urlencoded';
        let body = Common.serializeJSON({ client_id: config.clientId, refresh_token: refreshToken });
        console.log("BODY: ", body);

        let headers = {
            'Content-Type': contentType,
            Authorization: "Bearer " + token
        }
        let req = {
            method: "POST",
            headers: headers,
            body: null
        };

        req.body = body;
        await fetch(`${config.revocationEndpoint}`, req).then(checkStatus)
            .then(response => {
                console.log(response);
                AsyncStorage.removeItem(StorageKey);
                return true;
            }).catch(error => {
                console.log("AUTH API Service Error")
                console.log("ERROR", error)
                throw error;
            });
        return false;
    }


    async signOut({ accessToken, refreshToken }) {
        let success = true;
        try {

            console.log("SIGNOUT CONFIG", config);
            await AppAuth.revokeAsync(config, {
                token: accessToken,
                isClientIdProvided: true,
            });
            await AsyncStorage.removeItem(StorageKey);
        } catch ({ message }) {
            console.log(`Failed to revoke token: ${message}`);
            success = false;
        }
        if (!success)
            await this.logout(accessToken, refreshToken);
    }

    async getUserInfo() {
        const savedTokens = await this.getCachedAuth();
        if (savedTokens) {
            let url = `${config.issuer}/protocol/openid-connect/userinfo`;
            const fullResponse = await fetch(url,
                { headers: { 'Authorization': `Bearer ${savedTokens.accessToken}` } });
            if (fullResponse.ok) {
                return fullResponse.json();
            }
        }
        return undefined;
    }
}