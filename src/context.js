import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

//Provider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: storeProducts,
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };

    //copying values from data.js (not referencing)
    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];
        });

        this.setState(() => {
            return { products };
        });
    };

    componentDidMount() {
        this.setProducts();
    }

    getItem = id => {
        return this.state.products.find(el => el.id === id);
    };

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = id => {
        // change the product's inCart, count and price
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        // add product to the cart
        this.setState(
            {
                products: tempProducts,
                cart: [...this.state.cart, product]
            },
            () => console.log(this.state)
        );
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState({
            modalProduct: product,
            modalOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    increment = id => {
        console.log("increment method");
    };

    decrement = id => {
        console.log("decrement method");
    };

    removeItem = id => {
        console.log("item removed");
    };

    clearCart = () => {
        console.log("cart cleared");
    };

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    getItem: this.getItem,
                    handleRemove: this.handleRemove,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//Consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
