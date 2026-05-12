import { createContext, PropsWithChildren, useContext } from 'react';
import { CartItem, Product } from '../types';
import { useState } from 'react';
import { randomUUID } from 'expo-crypto';



// Define the shape of the cart context, which includes an array of cart items and a function to add items to the cart. This means we take items from the CartItem type and onAddItem is a function that takes a product and a size, which is a property of CartItem. This allows us to manage the state of the cart and provide functionality to add items to it.
type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
};

// Create a context for the cart with default values. The items array is initialized as empty, and the addItem function is defined as an empty function. This context will be used to provide cart-related data and functionality to components that need it.

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
});

// The CartProvider component is responsible for managing the state of the cart and providing the context to its children. It uses the useState hook to keep track of the items in the cart and defines the addItem function to add new items to the cart. The provider wraps its children with the CartContext.Provider, passing down the current items and the addItem function as the context value.


const CartProvider = ({children}: PropsWithChildren) => {

    const [items, setItems] = useState<CartItem[]>([]);

    // The addItem function creates a new cart item with the provided product and size, and adds it to the existing items in the cart. 

    const addItem = (product: Product, size: CartItem['size']) => {
        // if already in cart, increase quantity

        // This line checks if there is already an item in the cart that matches the product and size being added. It uses the find method to search through the items array for an item that has the same product and size. If such an item is found, it is stored in the existingItem variable. Rather than duplicating items in the cart, we can simply update the quantity of the existing item if it is already present.

        const existingItem= items.find(item => item.product === product && item.size === size);
        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            size,
            quantity: 1,
            product_id: product.id,
        };
        setItems(prevItems => [...prevItems, newCartItem]);
    }

    // The first line of the updateQuantity function creates a new array of cart items by mapping over the existing items. For each item, it checks if the item's id matches the provided itemId. If it does not match, it returns the item unchanged. If it does match, it creates a new object with the same properties as the original item but updates the quantity by adding the provided amount (which can be either -1 or 1). Finally, it updates the state with the new array of cart items.
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map((item) => 
            item.id !== itemId ? item : {...item, quantity: item.quantity + amount}).filter((item) => item.quantity > 0);
        setItems(updatedItems);

    };

    // The reduce will look through all the items and collect them all in one single value. It calls a functions with 2 things, the value we are building up and the second is the current item in the loop. So we start with 0 and then for each item we add the price of that item multiplied by its quantity to the total. This way we get the total price of all items in the cart.

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);