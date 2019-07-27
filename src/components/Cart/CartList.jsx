import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
    const { cart } = value;
    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key={item.id} item={item} value={value} />;
            })}
            {/* <h3>Hello from cartlist</h3> */}
        </div>
    );
}
