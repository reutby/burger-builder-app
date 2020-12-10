import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    
    componentDidUpdate() {
        console.log("[orderSummary] component should update");
    }

    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(keyIg => {
                return <li key={keyIg}><span style={{ transform: "capitalize" }}>{keyIg}</span>: {this.props.ingredients[keyIg]} </li>
            });
        return (

            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <h3>Total Price: {this.props.totalPrice} $</h3>
                <p>Continue to checkout?</p>
                <Button
                    btnType="Danger"
                    buttonClicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button
                    btnType="Success"
                    buttonClicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>)

    }


}

export default OrderSummary;