import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.rmvIng} className={classes.Less}>Less</button>
        <button onClick={props.addIng} className={classes.More}>More</button>
    </div>
);

export default BuildControl;