
import { checkStatus } from "../utils/apiUtils";
import { StorageHelper } from './Storage';
import { Common } from "../utils/Common";

var url = "http://10.0.2.2:8080";

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
    },
    placeOrder: async (order) => {
        return post(`/orders/place`, order);
    },
    myShopOrders: async() => {
        return get(`/orders/mine`);
    }
}

var get = async (endpoint) => {
    return restCall(endpoint);
}
var post = async (endpoint, data, form) => {
    return restCall(endpoint, 'POST', data, form || null);
}

var restCall = async (endpoint, method, data, form) => {
    let contentType = form ? 'application/x-www-form-urlencoded' : 'application/json';
    let body = form ? Common.serializeJSON(data) : JSON.stringify(data);

    let headers = {
        Accept: 'application/json',
        'Content-Type': contentType, //multipart/form-data
    }
    let req = {};
    let auth = await StorageHelper.get("Authorization");

    if (auth)
        headers.Authorization = auth.value;
    req.headers = headers;
    if (method)
        req.method = method;
    if (data)
        req.body = body;
    return fetch(`${url}${endpoint}`, req).then(checkStatus)
        .then(response => {
            return response.json();
        })
}