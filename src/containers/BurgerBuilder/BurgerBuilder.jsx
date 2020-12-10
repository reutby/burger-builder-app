import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    onion: 0.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            onion: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchaseMode: false
    }

    PurchasableOnModeHandler = () => {
        this.setState({ purchaseMode: true });
    };

    purchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };
    purchaseContinueHandler = () => {
        alert("you continue!");
    };

    setBackToStatingPrice = () => {
        this.setState({ totalPrice: 4 });
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
            this.setState({ ingredients: copyIg, totalPrice: Math.round(totalPrice * 100) / 100 });
            
        }
        this.updatePurchaseState(copyIg);
    };

    addIngredientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        let { totalPrice } = this.state;
        totalPrice += INGREDIENT_PRICES[type];
        copyIg[type]++;
        this.setState({ ingredients: copyIg, totalPrice: Math.round(totalPrice * 100) / 100 });
        this.updatePurchaseState(copyIg);

    };

    render() {
        return (
            <Aux>
                <Modal
                    show={this.state.purchaseMode}>
                    <OrderSummary ingredients={this.state.ingredients}
                        purchaseCancel={this.purchasableOffModeHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}

                    />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients}
                     />
                <BuildControls
                    setDefaultPrice={this.setBackToStatingPrice}
                    totalPrice={this.state.totalPrice}
                    removeIng={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    ingredients={this.state.ingredients}
                    addIng={this.addIngredientHandler}
                    onOrderClicked={this.PurchasableOnModeHandler} />
            </Aux>

        );
    }
}

export default BurgerBuilder;
