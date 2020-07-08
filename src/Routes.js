import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import UserDashboard from './user/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'


import Home from './core/Home'
import Menu from './core/Menu'

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/signin' exact component={SignIn}></Route>
                <Route path='/signup' exact component={SignUp}></Route>
               <PrivateRoute path="/dashboard" exact component={UserDashboard}>Dashboard</PrivateRoute>
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;