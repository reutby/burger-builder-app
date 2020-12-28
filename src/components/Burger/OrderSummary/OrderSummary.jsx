import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {


    const ingredients = Object.keys(props.ingredients)
        .map(keyIg => {
            return <li key={keyIg}><span style={{ transform: "capitalize" }}>{keyIg}</span>: {props.ingredients[keyIg]} </li>
        });
    return (

        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <h3>Total Price: {props.totalPrice} $</h3>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                buttonClicked={props.purchaseCancel}>CANCEL</Button>
            <Button
                btnType="Success"
                buttonClicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>)

}

export default OrderSummary;