import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

//Provider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct,
        cart: [],
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
            () => this.addTotals()
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
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState({
            cart: [...tempCart]
        }, ()=> {
            this.addTotals();
        })
    };

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;

        if(product.count === 0){
            this.removeItem(id);
        }
        else{
            product.total = product.count * product.price;
            this.setState({
                cart: [...tempCart]
            }, ()=> {
                this.addTotals();
            })
        }
    };

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        tempProducts[index].inCart = false;
        tempProducts[index].count = 0;
        tempProducts[index].total = 0;

        this.setState({
            cart: [...tempCart],
            products: [...tempProducts]
        }, () => {
            this.addTotals()
        })
    };

    clearCart = () => {
        this.setState(
            {
                cart: []
            },
            () => {
                // set products as in the beginning (default)
                this.setProducts();
                // calculate totals (set to 0)
                this.addTotals();
            }
        );
    };

    addTotals = () => {
        let subTotal = 0;
        // can be implemented with reduce also
        this.state.cart.map(item => {
            subTotal += item.total;
        });
        const tempTax = subTotal * 0.1;
        //parseFloat because toFixed returns a string..
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;

        this.setState({
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total
        });
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
