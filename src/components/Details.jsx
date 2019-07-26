import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const { title, price, info, inCart, id, company, img } = value.detailProduct;
                    // console.log(img);
                    return (
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            {/* product info */}
                            <div className="row">
                                {/* product img */}
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} alt="product" className="img-fluid" />
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2 font-weight-bold">
                                        made by: {company}
                                    </h4>
                                    <h4 className="text-blue">price: ${price}</h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        {info}
                                    </p>
                                    {/* buttons */}
                                    <Link to="/">
                                        <ButtonContainer>Back to products</ButtonContainer>
                                    </Link>
                                    <ButtonContainer
                                        // cart prop
                                        cart
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}
                                    >
                                        {inCart ? "in cart" : "add to cart"}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </ProductConsumer>
        );
    }
}
