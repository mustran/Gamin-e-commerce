import React, { Component } from 'react'
import {ProductConsumer} from '../context'
export default class Cart extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    return value.cart.map(prod => {
                        // console.log(prod.title);
                        return(
                        <div key={prod.id}>
                        {prod.title}
                        <button onClick={() => value.handleRemove(prod.id)}>remove</button>
                        </div>
                        ) 
                    })
                }}
            </ProductConsumer>
        )
    }
}
