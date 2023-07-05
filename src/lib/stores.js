import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";
import { localStorageStore } from '@skeletonlabs/skeleton';


function createCart() {

    const _cart = localStorageStore('cart', []);
    const { set, subscribe, update } = _cart;

    const sum = derived(_cart, $_cart => $_cart.reduce((total, item) => total + (item.price * item.quantity), 0));

    return {
        subscribe,
        reset: () => {
            set([]);
        },
        increaseItem: (product, variant, option, quantity) => {
            update(currentCart => {
                for (let cartItem of currentCart) {
                    if (cartItem.product == product && cartItem.variant == variant && cartItem.option == option) {
                        cartItem.quantity += quantity;
                        currentCart = currentCart;
                        return currentCart;
                    }
                }
            })
            
        },
        decreaseItem: (product, variant, option, quantity) => {
            update(currentCart => {
                for (let cartItem of currentCart) {
                    if (cartItem.product == product && cartItem.variant == variant && cartItem.option == option) {
                        cartItem.quantity -= quantity;
                        if (cartItem.quantity == 0) {
                            const index = currentCart.indexOf(cartItem);
                            currentCart.splice(index, 1);
                            return currentCart;
                        }
                        currentCart = currentCart;
                        return currentCart;
                    }
                }
            })
            
        },
        addItem: (item) => {
            update(currentCart => {
                for (let cartItem of currentCart) {
                    if (cartItem.product == item.product && cartItem.variant == item.variant && cartItem.option == item.option) {
                        cartItem.quantity += item.quantity;
                        currentCart = currentCart;
                        return currentCart;
                    }
                }
                return [item, ...currentCart];
            })
        },
        removeItem: (item) => {
            update(currentCart => {
                for (let cartItem of currentCart) {
                    if (cartItem.product == item.product && cartItem.variant == item.variant && cartItem.option == item.option) {
                        const index = currentCart.indexOf(item);
                        currentCart.splice(index, 1);
                        return currentCart;
                    }
                }
            })
        },
        sum
    }


}

export const cart = createCart();
export const cartDropdownOpen = writable(false);
export const userOrder = localStorageStore('userOrder', {})

export const userAddress = localStorageStore('userAddress', {
    "name": "",
    "street1": "",
    "street2": "",
    "city": "",
    "state": "UT",
    "zip": "",
    "country": "US"
})
