import { StorageHelper } from "./Storage";

export var CartService = {
    add: async (product, qty) => {
        let cart = await StorageHelper.get('CART');
        let key = 'item' + product.id;
        if (cart == null || (cart.size > 0 && cart.values().next().value.shop.id != product.shop.id))
            cart = new Map();

        if (cart[key] != null)
            cart[key].qty += qty;
        else
            cart[key] = { product: product, qty: qty };


        let stored = await StorageHelper.put('CART', cart);
        return stored;
    },
    getCart: async () => {
        let cart = await StorageHelper.get('CART');
        
        let items = [];
        for (key in cart)
            items.push(cart[key]);
        return items;
    },
    count: async () => {
        let cart = await StorageHelper.get('CART');
        let total = 0;
        for (key in cart)
            total += cart[key].qty;
        //console.log(total)
        return total;
    },
    clearCart: async () => {
        let s = await StorageHelper.remove('CART')
        return s;
    }
}