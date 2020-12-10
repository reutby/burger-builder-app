import React from "react";
import classes from "./Modal.module.css"
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux";

const Modal = (props) => {
    return (
        <Aux>
        <BackDrop show={props.show}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>

        </Aux>);
}


export default Modal;