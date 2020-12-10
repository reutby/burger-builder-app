import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controlsList = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Onion", type: "onion" }
];
const BuildControls = (props) => {
    
    return(
    <div className={classes.BuildControls}>
        <h3 >Current Price: {props.totalPrice} $</h3>

        {controlsList.map((control) => (<BuildControl
            rmvIng={() => props.removeIng(control.type)}
            addIng={() => props.addIng(control.type)}
            key={control.label} label={control.label}
            type={control.type}
            ingredientCount={props.ingredients[control.type]}
        />))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.onOrderClicked}
        >ORDER NOW</button>
    </div>)
};

export default BuildControls;