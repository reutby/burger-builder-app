import React from "react"

import classes from "./Order.module.css"
const Order =(props)=>{

    const orderIngredients =[];
    for(let key in props.ingredients){
        orderIngredients.push({
            ingredient:key,
            amount:props.ingredients[key]
        });
    }
    const orderString = orderIngredients.map(ingredient=>{
        return <span key={ingredient.ingredient}> {ingredient.ingredient} ({ingredient.amount})</span>
    })
    return(
        <div className={classes.Order}>
            <p>{orderString}</p>
            <p>Price: <strong>{props.price} USD </strong></p>
        </div>
    )
}

export default Order;