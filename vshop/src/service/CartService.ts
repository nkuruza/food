import { StorageHelper } from "./Storage";

export var CartService = {
    add: async (product, qty) => {
        let cart = await StorageHelper.get('CART' + product.shop.id);
        let key = 'item' + product.id;
        if (cart == null || (cart.size > 0 && cart.values().next().value.shop.id != product.shop.id))
            cart = new Map();

        if (cart[key] != null)
            cart[key].qty += qty;
        else
            cart[key] = { product: product, qty: qty };


        let stored = await StorageHelper.put('CART' + product.shop.id, cart);
        return stored;
    },
    getCart: async (shopId) => {
        console.log(shopId)

        let cart = await StorageHelper.get('CART' + shopId);
        console.log(cart);
        let items = [];
        for (let key in cart)
            items.push(cart[key]);
        console.log(items)
        return items;
    },
    count: async (shopId) => {
        let cart = await StorageHelper.get('CART' + shopId);
        console.log(cart);
        let total = 0;
        for (let key in cart)
            total += cart[key].qty;
        return total;
    },
    clearCart: async (shopId) => {
        let s = await StorageHelper.remove('CART' + shopId)
        return s;
    }
}