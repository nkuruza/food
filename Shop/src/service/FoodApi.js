
import { checkStatus } from "../utils/apiUtils";
import { StorageHelper } from './Storage';

var url = "http://192.168.0.155:8080";

export var FoodApi = {
    signUp: async (user) => {
        return post(`/users/add`, user);
    },
    login: async (user) => {
        return post(`/users/login`, user)
    },
    getUserByDevice: async (deviceId) => {
        return get(`/users/by-device/${deviceId}`)
    },
    addShopItem: async (item) => {
        return post(`/products/add`, item)
    },
    updateShopItem: async (item) => {
        return post(`/products/update`, item)
    },
    removeShopItem: async (id) => {
        return get(`/products/remove/${id}`);
    },
    getShopItems: async (id) => {
        return get(`/products/list/${id}`)
    },
    listShops: async () => {
        return get(`/shops/list`)
    }
}

var get = async (endpoint) => {
    return restCall(endpoint);
}
var post = async (endpoint, data) => {
    return restCall(endpoint, 'POST', data);
}

var restCall = async (endpoint, method, data) => {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    let req = {};
    let auth = await StorageHelper.get("Authorization");
    console.log(auth);
    if (auth)
        headers.Authorization = auth.value;
    req.headers = headers;
    if (method)
        req.method = method;
    if (data)
        req.body = JSON.stringify(data);
    return fetch(`${url}${endpoint}`, req).then(checkStatus)
        .then(response => {
            console.log(response)
            console.log(JSON.parse(response._bodyText))
            return response.json();
        })
        .catch(e => console.log(e));
}