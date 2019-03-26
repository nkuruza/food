
import { checkStatus } from "../utils/apiUtils";
import { StorageHelper } from './Storage';
import { Common } from "../utils/Common";

var url = "http://192.168.0.155:8080";

export var FoodApi = {
    signUp: async (user) => {
        return post(`/users/add`, user);
    },
    login: async (user) => {
        return get(`/users/me`)
    },
    getUserByDevice: async (deviceId) => {
        return get(`/users/by-device/${deviceId}`)
    },
    addShopItem: async (shopId, item) => {
        return post(`/products/add/${shopId}`, item)
    },
    updateShopItem: async (item) => {
        return post(`/products/update`, item);
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
        return post(`/shops/save`, shop);
    }
}

var get = async (endpoint) => {
    return restCall(endpoint);
}
var post = async (endpoint, data, form) => {
    return restCall(endpoint, 'POST', data, form || null);
}

var restCall = async (endpoint, method, data, form) => {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    let req = {};
    let auth = await StorageHelper.get("Authorization");
    
    if (auth)
        headers.Authorization = auth.value;
    req.headers = headers;
    if (method)
        req.method = method;
    if (data)
        req.body = form ? Common.serializeJSON(data) : JSON.stringify(data);
    return fetch(`${url}${endpoint}`, req).then(checkStatus)
        .then(response => {
            return response.json();
        })
        //.catch(e => console.log(e));
}