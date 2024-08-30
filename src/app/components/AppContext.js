"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export const cartProductPrice = (product) => {
  let price = product.basePrice;
  if (product.size) {
    price += product.size.price;
  }
  if (product.extras?.length > 0) {
    for (const extra of product.extras) {
      price += extra.price;
    }
  }
  return price;
};

export const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts( JSON.parse( ls.getItem('cart') ) );
    }
  }, []);

  const clearCart = () => {
    setCartProducts([]);
    saveCartProductsToLs([]);
  };

  const removeCartProducts = (indexToRemove) => {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLs(newProducts);
      return newProducts;
    });
    toast.success("Product removed from cart");
  };

  const saveCartProductsToLs = (cartProducts) => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLs(newProducts);
      return newProducts;
    });
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          cartProductPrice,
          addToCart,
          clearCart,
          removeCartProducts,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};
