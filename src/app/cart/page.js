"use client";

import SectionHeaders from "../components/layout/SectionHeaders";
import { useContext, useEffect } from "react";
import { CartContext } from "../components/AppContext";
import Image from "next/image";
import Trash from "../components/icons/Trash";
import AddressInputs from "../components/layout/AddressInputs";
import { useState } from "react";
import { useProfile } from "../components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "../components/menu/CartProduct";

const CartPage = () => {
  const { cartProducts, removeCartProducts, cartProductPrice } =
    useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { city, country, phone, postalCode, streetAddress } = profileData;
      const addressFromProfile = {
        city,
        country,
        phone,
        postalCode,
        streetAddress,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = cartProducts.reduce(
    (acc, product) => acc + cartProductPrice(product),
    0
  );

  const proceedToCheckout = async (ev) => {
    ev.preventDefault();
    // address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  };

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="mt-8 grid md:grid-cols-2 md:gap-16">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-center">
              <p>No products in your cart</p>
            </div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                index={index}
                product={product}
                onRemove={removeCartProducts}
              />
            ))}
            <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}<br />
              $5<br />
              ${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={(key, value) =>
                setAddress({ ...address, [key]: value })
              }
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
