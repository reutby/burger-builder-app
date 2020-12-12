import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import orderAxios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


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
        purchaseMode: false,
        loading:false
    }

    PurchasableOnModeHandler = () => {
        this.setState({ purchaseMode: true });
    };

    purchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };

    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "reut",
                address: {
                    street: "evenu street",
                    zipCode: "12543",
                    country: "Israel"
                },
                email: "blabla@hello.com"
            },
            deliveryMethod: "fastest"
        };
        orderAxios.post("/orders.json", order)
            .then(response => {
                this.setState({loading:false, purchaseMode:false});
            })
            .catch(err => {
                this.setState({loading:false, purchaseMode:false});
            });

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
                    show={this.state.purchaseMode}
                    closedModal ={this.purchasableOffModeHandler}>
                    {this.state.loading? <Spinner /> : <OrderSummary ingredients={this.state.ingredients}
                        purchaseCancel={this.purchasableOffModeHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}

                    />}
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

export default withErrorHandler(BurgerBuilder,orderAxios);
