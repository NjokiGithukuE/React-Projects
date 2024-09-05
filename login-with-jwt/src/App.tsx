import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateRoute from './Auth/PrivateRoute';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Login} />
          <Route exact path="/register" component={SignUp} />
        </Switch>
    </BrowserRouter>
  )
}

export default App;