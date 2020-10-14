import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, createOrder } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers"


const CheckOut = ({products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        success: false,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    let deliveryAddress = data.address;

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;


    const buy = () => {
        setData({ loading: true });
        const createOrderData = {
            products: products,
            transaction_id: 1,
            amount: getTotals(),
            address: deliveryAddress
        };

        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });

        
    };

    const getTotals = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.quantity
        }, 0);
    }


    const showCheckout = () =>{
        return isAuthenticated() ? (
            <button className="btn btn-primary btn-block" onClick={buy}>Buy</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    }

    return (<div>
        <h2>Total ${getTotals()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
        </div>)

}

export default CheckOut;