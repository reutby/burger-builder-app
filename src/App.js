import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Spinner from "./components/UI/Spinner/Spinner";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
//import asyncComponent from './hoc/asyncComponent/asyncComponent';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const App = props => {

  useEffect(() => {
    props.onAuthCheckState();
  }, []);


  let routes =
    <Switch>
      <Route path="/auth" render={(props)=> <Auth  {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  
  if (props.isAuth) {
    routes =
      <Switch>
        <Route path="/checkout" render = {(props)=> <Checkout {...props} />} />
        <Route path="/orders" render = {(props)=> <Orders  {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props)=> <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
  }
  return (
    <div >
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId !== null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
