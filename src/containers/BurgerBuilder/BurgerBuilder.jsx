import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder.module.css";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }
    removeIngredientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        let { totalPrice } = this.state;
        totalPrice -= INGREDIENT_PRICES[type];
        if (copyIg[type] && totalPrice > 0) {
            copyIg[type]--;
            this.setState({ ingredients: copyIg, totalPrice: Math.floor(totalPrice) });
        }
    };

    addIngredeientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        let { totalPrice } = this.state;
        totalPrice += INGREDIENT_PRICES[type];
        copyIg[type]++;
        this.setState({ ingredients: copyIg, totalPrice: Math.floor(totalPrice) });
    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <p className={classes.TotalPrice}>Total Price: {this.state.totalPrice} $</p>
                <BuildControls removeIng={this.removeIngredientHandler} addIng={this.addIngredeientHandler} />
            </Aux>

        );
    }
}

export default BurgerBuilder;
