import { Component } from "react";
import { Props } from "../utils/Common";
import { AuthenticationApi } from "../service/Authentication";
import { Base64 } from "../utils/Base64";
import { FoodApi } from "../service/FoodApi";

let AUTH: AuthenticationApi = AuthenticationApi.getInstance();

export default abstract class AuthenticatedScreen extends Component<any, any>{

    protected user: any;
    protected roles: string[] = [];
    protected token: any;

    componentDidMount() {
        AUTH.getCachedAuth().then(token => {
            if (token) this.completeSignIn(token.accessToken);
            else this.signIn();
        }).catch(error => {
            this.signIn();
        });
    }

    signIn() {
        AUTH.signIn().then(token => {
            if (token) this.completeSignIn(token.accessToken);
        });
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
        })

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

    logout() {
        AUTH.getCachedAuth().then(token => {
            AUTH.signOut(token);
        })

    }
}