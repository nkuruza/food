import { AsyncStorage } from 'react-native';

export var StorageHelper = {
    put: async (key, value) => {
        try {
            var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(value));
            return jsonOfItem;
        } catch (error) {
            console.log(error.message);
        }
    },
    get: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value);
        } catch (error) {
            console.log(error.message);
        }
    }

}