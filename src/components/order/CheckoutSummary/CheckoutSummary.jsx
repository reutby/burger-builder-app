import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
const CheckoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you enjoy your burger!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger"
            buttonClicked ={props.checkoutCancel}>
                CANCEL
            </Button>

            <Button btnType="Success"
            buttonClicked={props.checkoutContinue}>
                CONTINUE
            </Button>
        </div>
    )
}

export default CheckoutSummary;