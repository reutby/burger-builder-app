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
        {controlsList.map((control) => (<BuildControl rmvIng={props.removeIng} addIng={props.addIng} key={control.label} label={control.label} type={control.type}/>))}
    </div>
);

export default BuildControls;