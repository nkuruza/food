import { AUTH_APP, clientId, realm } from "../../config.json";
import { ExpoKeyckloakLogin, defaultTokenStorage } from 'expo-login-keycloak';

var login = new ExpoKeyckloakLogin({
    clientId: clientId,
    realm: realm,
    url: AUTH_APP
});

function getUserData(tokens: any) {
    if (tokens == null)
        return null;
    let token = tokens.access_token;
    return JSON.parse(atob(token.split('.')[1]));
}

export var LoginApi = {
    getUser: async () => {
        let tokens = await defaultTokenStorage.loadTokens();
        return getUserData(tokens);
    }
    ,
    login: async () => {
        let tokens = await login.login();
        await defaultTokenStorage.saveTokens(tokens);
    }
}
