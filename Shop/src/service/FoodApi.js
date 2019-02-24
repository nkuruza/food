
import { checkStatus } from "../utils/apiUtils";
import { StorageHelper} from './Storage';

var url = "http://192.168.0.155:8080";
var get = async (endpoint) => {
    return fetch(`${url}${endpoint}`)
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}
var post = async (endpoint, data) => {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    return fetch(`${url}${endpoint}`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data),
    }).then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}

export var FoodApi = {
    signUp: async (user) => {
        return post("/users/add", user);
    },
    login: async (user) => {
        return post("/users/login", user)
    },
    getUserByDevice: async (deviceId) => {
        return get(`/users/by-device/${deviceId}`)
    },
    addShopItem: async (item) => {
        return post("/shop/item/add", item)
    },
    updateShopItem: async (item) => {
        return post("/shop/item/update", item)
    },
    removeShopItem: async (id) => {
        return get(`/shop/item/remove${id}`);
    },
    getMyItems: async () => {
        return get("/shop/item/list");
    },
    getShopItems: async (id) => {
        return get(`/shop/item/list/${id}`)
    },
    listShops: async () => {
        return get("/shop/list")
    }
}