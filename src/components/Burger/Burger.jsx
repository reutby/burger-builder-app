import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css"
const Burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            const countIngredients = [...Array(props.ingredients[igkey])]
                .map((_, index) => {
                    return <BurgerIngredient key={igkey + index} type={igkey} />
                });
            return countIngredients;
        }).reduce((array, el) => {
            return array.concat(el);
        }, []);
    console.log(transformIngredients);
    if (!transformIngredients.length) {
        transformIngredients = <p>Please Start Adding Ingredients</p>;
    }
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );

}

export default Burger;