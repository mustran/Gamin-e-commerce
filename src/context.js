import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

//Provider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: []
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

    handleRemove = id => {
        // remove the id from the cart and set the inCart value to false, count = 0
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = false;
        product.count = 0;

        let tempCart = [...this.state.cart];
        const indexCart = tempCart.indexOf(this.getItem(id));
        tempCart.splice(indexCart, 1);
        this.setState({
            products: tempProducts,
            cart: tempCart
        }, () => console.log(this.state));
    };
    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    getItem: this.getItem,
                    handleRemove: this.handleRemove
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
