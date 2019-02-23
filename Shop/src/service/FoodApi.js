
import { checkStatus } from "../utils/apiUtils";
var url = "http://192.168.0.155:8080";
var get = async (endpoint) => {
    return fetch(endpoint)
        .then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}
var post = async (endpoint, data) => {
    return fetch(`${url}${endpoint}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    }).then(checkStatus)
        .then(response => { return response.json() })
        .catch(e => console.log(e));
}

export var FoodApi = {
    signUp: async (user) => {
        console.log(url)
        console.log(user);
        return post("/users/add", user);
    },
    getUserByDevice: async (deviceId) => {
        return this.get(`${this.url}/users/by-device`)
    }
}