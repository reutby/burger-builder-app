import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={()=>(props.rmvIng(props.type))} className={classes.Less}>Less</button>
        <button onClick={()=>(props.addIng(props.type))} className={classes.More}>More</button>
    </div>
);

export default BuildControl;