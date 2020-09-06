import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import UserDashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

import AdminDashboard from "./user/AdminDashboard"
import Home from "./core/Home";
import Menu from "./core/Menu";
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"
import Shop from "./core/Shop"
import Product from './core/Product'


const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/product/:productId" exact component={Product} />
        
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
