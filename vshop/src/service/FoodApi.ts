
import { checkStatus } from "../utils/apiUtils";
import { StorageHelper } from './Storage';
import { Common, MediaType } from "../utils/Common";
import { AuthenticationApi } from "./Authentication";

var url = "https://dev.asandasystems.co.za/food-service";

const authApi = AuthenticationApi.getInstance();

export var FoodApi = {
    signUp: async (user) => {
        return post(`/users/add`, user, null);
    },
    login: async (user) => {
        return get(`/users/me`)
    },
    getUserByDevice: async (deviceId) => {
        return get(`/users/by-device/${deviceId}`)
    },
    addShopItem: async (shopId, item) => {
        return post(`/products/add/${shopId}`, item, null)
    },
    updateShopItem: async (item) => {
        return post(`/products/update`, item, null);
    },
    removeShopItem: async (id) => {
        return get(`/products/remove/${id}`);
    },
    getShopItems: async (id) => {
        return get(`/products/list/${id}`)
    },
    listShops: async () => {
        return get(`/shops/list`);
    },
    listMyShops: async () => {
        return get(`/shops/mine`)
    },
    saveShop: async (shop) => {
        return post(`/shops/save`, shop, null);
    },
    placeOrder: async (order) => {
        return post(`/orders/place`, order, null);
    },
    myShopOrders: async () => {
        return get(`/orders/mine`);
    }
}

var get = async (endpoint: string) => {
    return restCall(endpoint);
}
var post = async (endpoint: string, data: any, form: boolean) => {
    return restCall(endpoint, 'POST', data, form || null);
}

var restCall = async (endpoint: string, method?: string, data?: any, form?: boolean) => {
    let contentType = MediaType.APPLICATION_JSON;
    let body = JSON.stringify(data);
    if(form){
        contentType = 'application/x-www-form-urlencoded';
        Common.serializeJSON(data);
    }
    let headers = {
        Accept: MediaType.APPLICATION_JSON,
        'Content-Type': contentType,
        Authorization: null
    }
    let req = {
        method: method,
        headers: headers,
        body: null
    };
    let auth = await authApi.getCachedAuth();

    console.log("auth", auth)

    if (auth)
        headers.Authorization = "Bearer " + auth.accessToken;


    if (data)
        req.body = body;
    return fetch(`${url}${endpoint}`, req).then(checkStatus)
        .then(response => {
            return response.json();
        })
}