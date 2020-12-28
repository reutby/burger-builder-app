import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"

import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
const Checkout = (props) => {


    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace("/checkout/contact-data");
    }

    let summary = <Redirect to="/" />
    if (props.ings) {
        summary = <div><CheckoutSummary
            checkoutCancel={checkoutCancelHandler}
            checkoutContinue={checkoutContinueHandler}
            ingredients={props.ings} />
            <Route path={props.match.path + "/contact-data"}
                component={ContactData} />
        </div>
    }
    return summary;

}


const mapStatesToProps = ((state) => {
    return {
        ings: state.bbr.ingredients
    };
});

export default connect(mapStatesToProps)(Checkout);
