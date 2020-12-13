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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchaseMode: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        orderAxios.get("https://my-burger-app-36539-default-rtdb.firebaseio.com/ingredient.json")
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: true });
            })
            ;
    }
    PurchasableOnModeHandler = () => {
        this.setState({ purchaseMode: true });
    };

    purchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
        
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice)
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
        let orderSummary = null;
        let burger = <p>Ingredients can't be loaded!</p>;

        if (!this.state.error) {
            if (this.state.loading || !this.state.ingredients) {
                orderSummary = <Spinner />;
            }
            else {
                orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.purchasableOffModeHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}

                />
            }
            burger = (this.state.ingredients) ? (<Aux>
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
            </Aux>) : <Spinner />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchaseMode}
                    closedModal={this.purchasableOffModeHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

export default withErrorHandler(BurgerBuilder, orderAxios);
