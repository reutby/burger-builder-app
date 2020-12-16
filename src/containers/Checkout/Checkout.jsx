import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"

import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = <div><CheckoutSummary
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                ingredients={this.props.ings} />
                <Route path={this.props.match.path + "/contact-data"}
                    component={ContactData} />
            </div>
        }
        return summary;
    }
}


const mapStatesToProps = ((state) => {
    return {
        ings: state.bbr.ingredients
    };
});

export default connect(mapStatesToProps)(Checkout);
