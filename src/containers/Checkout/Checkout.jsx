import React, { Component } from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {

    state = {
        ingredients: {
            meat: 1,
            bacon: 1,
            salad: 1,
            cheese: 1,
            onion: 0
        },
        totalPrice:0
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const updateIngredients ={};
        let totalPrice=0;
        for(let param of query.entries()){
            if(param[0] === "price"){
                totalPrice = param[1];
            }else{
                updateIngredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:updateIngredients, totalPrice:totalPrice})
    }
    checkoutCancelHandler= ()=>{
        this.props.history.goBack();
    }

    checkoutContinueHandler= ()=>{
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
        return(
            <div>
                <CheckoutSummary checkoutCancel={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler} ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path+ "/contact-data"} render={(props)=>(<ContactData {...props} price={this.state.totalPrice} ingredients={this.state.ingredients}/>)}/>
            </div>
        );
    }
}

export default Checkout;
