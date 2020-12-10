import React from "react";
import Aux from "../../../hoc/Aux/Aux";
const OrderSummary =(props)=>{

    const ingredients = Object.keys(props.ingredients)
    .map(keyIg=>{
        return <li><span style={{transform:"capitalize"}}>{keyIg}</span>: {props.ingredients[keyIg]} </li>
    });
    return(

        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
        </Aux>
    )

}

export default OrderSummary;