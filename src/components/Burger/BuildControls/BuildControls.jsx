import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controlsList = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" }
];
const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        {controlsList.map((control) => (<BuildControl rmvIng={()=>props.removeIng(control.type)} addIng={()=>props.addIng(control.type)} key={control.label} label={control.label} type={control.type}/>))}
    <button className={classes.OrderButton}>ORDER NOW</button>
    </div>
);

export default BuildControls;