
import { checkStatus } from "../utils/apiUtils";
import { Common, MediaType } from "../utils/Common";
import { AuthenticationApi } from "./Authentication";

var url = "https://dev.asandasystems.co.za/food-service";
//var url = "http://192.168.1.2:8081";

const authApi = AuthenticationApi.getInstance();

export var FoodApi = {
    signUp: async (user) => {
        return post(`/users/add`, user, null);
    },
    newUser: async (user) => {
        return post(`/users/new`, user, null);
    },
    whoami: async () => {
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
    updateOrderStatus: async (order) => {
        return post(`/orders/status`, order, null);
    },
    getPendigOrder: async () => {
        return get(`/orders/pending`);
    },
    getOrderById: async (orderId) => {
        return get(`/orders/${orderId}`);
    },
    myShopOrders: async () => {
        return get(`/orders/mine`);
    },
    listShopOrders: async (shopId) => {
        return get(`/orders/shop/${shopId}`);
    },
    mapKey: async () => {
        return get("/users/mapkey")
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
    if (form) {
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


    if (auth)
        headers.Authorization = "Bearer " + auth.accessToken;


    if (data)
        req.body = body;
    return fetch(`${url}${endpoint}`, req).then(checkStatus)
        .then(response => {
            try {
                return response.json();
            }
            catch (e) {
                return response;
            }

        }).catch(error => {
            console.log("API Service Error")
            console.log("ERROR", error)
            throw error;
        });
}