import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
    let InputElement = null;
    let ValidationError=null;
    const inputClasses = [classes.InputElement];
    
    if(props.invalid && props.isTouch){
        inputClasses.push(classes.Invalid);
        ValidationError = <p>Please Enter a valid value!</p>;
    }

    switch (props.elementType) {
        case "input":
            InputElement = <input
                className={inputClasses.join(" ")}
                onChange={props.onChange}
                {...props.elementConfig}
                value={props.value} />
            break;
        case "textarea":
            InputElement = <textarea
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                onChange={props.onChange}
                value={props.value} />
            break;
        case "select":
            const options = props.elementConfig.options;
            InputElement =
                <select
                    className={classes.InputElement}
                    name={props.elementConfig.name}
                    onChange={props.onChange}
                    value={props.value}>
                    {options.map((option) => {
                        return <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    })}
                </select>
            break;

        default:
            InputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
            {ValidationError}
        </div>

    );
}

export default Input;