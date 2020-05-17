// TODO REFACTOR THIS NONSENSE
import { checkStatus } from "../utils/apiUtils";
import { Common, MediaType } from "../utils/Common";
import { AuthenticationApi } from "./Authentication";

//TODO read the below from a config file.
//var url = "https://dev.asandasystems.co.za/food-service";
var url = "http://192.168.1.2:8081";

const authApi = AuthenticationApi.getInstance();

export var FoodApi = {
    signUp: async (user) => {
        return post(`/users/add`, user, null);
    },
    newUser: async (role, name, address, lon, lat, image) => {
        return postUser(role, name, address, lon, lat, image);
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
    listMarketShops: async (loc) => {
        return post(`/shops/market`, loc);
    },
    listMyShops: async () => {
        return get(`/shops/mine`)
    },
    saveShop: async (shop) => {
        return postShop(shop)
    },
    placeOrder: async (order) => {
        return post(`/orders/place`, order);
    },
    updateOrderStatus: async (order) => {
        return post(`/orders/status`, order);
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
    listCustomerOrders: async () => {
        return get(`/orders/mine/customer`);
    },
    listShopOrders: async (shopId) => {
        return get(`/orders/shop/${shopId}`);
    },
    mapKey: async () => {
        return get("/users/mapkey")
    },
    logout: async () => {
        return get("/users/logout");
    },
    getImage: async (name) => {
        return get(`/files/download/${name}`);
    },
    getImageUrl: (name) => {
        return `${url}/files/download/${name}`
    }
}

var get = async (endpoint: string) => {
    return restCall(endpoint);
}
var post = async (endpoint: string, data: any, form?: boolean) => {
    return restCall(endpoint, 'POST', data, form || null);
}

var postShop = async (shop) => {

    let filename = shop.image.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let auth = await authApi.getCachedAuth();


    let formData = new FormData();
    formData.append('image', { uri: shop.image, name: filename, type });
    formData.append('name', shop.name)
    formData.append('address', shop.address)
    formData.append('lon', shop.lon)
    formData.append('lat', shop.lat)

    return await fetch(`${url}/shops/save`, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + auth.accessToken
        },
    }).then(checkStatus)
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

var postUser = async (role, name, address, lon, lat, image) => {
    let filename = null;
    let type = null;
    let auth = await authApi.getCachedAuth();
    let formData = new FormData();
    let path = null;
    
    let req = {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + auth.accessToken
        }
    }
    if (role == "ROLE_MERCHANT" && image != null) {
        filename = image.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        type = match ? `image/${match[1]}` : `image`;
        formData.append('image', { uri: image, name: filename, type });
        formData.append('name', name)
        formData.append('address', address)
        formData.append('lon', lon)
        formData.append('lat', lat)
        formData.append('role', role)
        req.body = formData;
        req.headers["Content-Type"] = 'multipart/form-data'
        path = "/users/new";
    }
    else {
        path = "/users/newcustomer";
    }
    console.log(`HERE IS THE YRL: ${url}${path}`);

    return await fetch(`${url}${path}`, req).then(checkStatus)
        .then(response => {
            return response;
        }).catch(error => {
            console.log("API Service Error")
            console.log("ERROR", error)
            throw error;
        });

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