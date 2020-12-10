import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder.module.css";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
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
        totalPrice: 4,
        purchasable: false,
        purchaseMode: false
    }

    PurchasableOnModeHandler = () => {
        this.setState({ purchaseMode: true });
    };

    PurchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };

    updatePurchaseState = (ingredient) => {
        const sum = Object.keys(ingredient)
            .map(keyIg => {
                return ingredient[keyIg];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    removeIngredientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        let { totalPrice } = this.state;
        totalPrice -= INGREDIENT_PRICES[type];
        if (copyIg[type] && totalPrice > 0) {
            copyIg[type]--;
            this.setState({ ingredients: copyIg, totalPrice: Math.floor(totalPrice) });
        }
        this.updatePurchaseState(copyIg);
    };

    addIngredeientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        let { totalPrice } = this.state;
        totalPrice += INGREDIENT_PRICES[type];
        copyIg[type]++;
        this.setState({ ingredients: copyIg, totalPrice: Math.floor(totalPrice) });
        this.updatePurchaseState(copyIg);

    };

    render() {
        return (
            <Aux>
                <Modal
                    show={this.state.purchaseMode}
                    onBackDropCliced={this.PurchasableOffModeHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <p className={classes.TotalPrice}>Total Price: {this.state.totalPrice} $</p>
                <BuildControls
                    removeIng={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    ingredients={this.state.ingredients}
                    addIng={this.addIngredeientHandler}
                    onOrderClicked={this.PurchasableOnModeHandler} />
            </Aux>

        );
    }
}

export default BurgerBuilder;
