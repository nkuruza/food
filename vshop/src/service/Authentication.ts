import { AsyncStorage } from 'react-native';
import * as AppAuth from 'expo-app-auth';

const config = {
    issuer: 'https://auth.asandasystems.co.za/auth/realms/virtual-shop',
    scopes: ['openid', 'profile', 'roles'],
    clientId: 'vshop-server',
};


const StorageKey = '@Security:KeycloakOAuthKey';

export class AuthenticationApi {

    private static auth: AuthenticationApi;

    private constructor(){

    }

    public static getInstance(){
        if(this.auth == null)
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
        //console.log('getCachedAuthAsync', authState);
        if (authState) {
            try{
                if (this.checkIfTokenExpired(authState)) {
                    return this.refreshAuth(authState);
                } else {
                    return authState;
                }
            }
            catch(error){
                console.log("getCachedAuth", error)
                throw error;
            }
            
        }
        return null;
    }

    checkIfTokenExpired({ accessTokenExpirationDate }) {
        return new Date(accessTokenExpirationDate) < new Date();
    }

    async refreshAuth({ refreshToken }) {
        try{
            const authState = await AppAuth.refreshAsync(config, refreshToken);
            //console.log('refreshAuth', authState);
            await this.cacheAuth(authState);
            return authState;
        }
        catch(error){
            console.log('error', error)
            throw error;
        }
        
    }


    async signOut({ accessToken }) {
        try {
            await AppAuth.revokeAsync(config, {
                token: accessToken,
                isClientIdProvided: true,
            });

            await AsyncStorage.removeItem(StorageKey);
            return null;
        } catch ({ message }) {
            alert(`Failed to revoke token: ${message}`);
        }
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