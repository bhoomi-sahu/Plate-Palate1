import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext =
  createContext();

export const CartProvider =
({ children }) => {

  const [cart, setCart] =
    useState([]);

  // LOAD CART
  useEffect(() => {

    const savedCart =
      localStorage.getItem(
        "cart"
      );

    if (savedCart) {

      setCart(
        JSON.parse(savedCart)
      );

    }

  }, []);

  // SAVE CART
  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // ADD TO CART
  const addToCart =
  (food) => {

    const existing =
      cart.find(
        item =>
          item._id === food._id
      );

    if (existing) {

      setCart(
        cart.map(item =>

          item._id === food._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);

    }

  };

  // REMOVE ITEM
  const removeFromCart =
  (id) => {

    setCart(
      cart.filter(
        item => item._id !== id
      )
    );

  };

  // CLEAR CART
  const clearCart = () => {

    setCart([]);

  };

  return (

    <CartContext.Provider
      value={{

        cart,

        addToCart,

        removeFromCart,

        clearCart,

      }}
    >

      {children}

    </CartContext.Provider>

  );
};