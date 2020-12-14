import React from "react"

import classes from "./Order.module.css"
const Order =(props)=>{
    return(
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)...</p>
            <p>Price:<strong>5.45 USD </strong></p>
        </div>
    )
}

export default Order;