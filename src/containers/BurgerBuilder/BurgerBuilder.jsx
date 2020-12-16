import React, { Component } from "react";
import { connect } from "react-redux"

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import orderAxios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionsTypes from "../../store/actions";


class BurgerBuilder extends Component {

    state = {

        purchaseMode: false,
        loading: false,
        error: false
    }
    // componentDidMount() {
    //     orderAxios.get("https://my-burger-app-36539-default-rtdb.firebaseio.com/ingredient.json")
    //         .then(res => {
    //             this.setState({ ingredients: res.data });
    //         })
    //         .catch(err => {
    //             this.setState({ error: true });
    //         })
    //         ;
    // }
    PurchasableOnModeHandler = () => {
        this.setState({ purchaseMode: true });
    };

    purchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };

    purchaseContinueHandler = () => {
       
        this.props.history.push('/checkout')
    };




    updatePurchaseState = (ingredient) => {
        const sum = Object.keys(ingredient)
            .map(keyIg => {
                return ingredient[keyIg];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    render() {
        let orderSummary = null;
        let burger = <p>Ingredients can't be loaded!</p>;

        if (!this.state.error) {
            if (this.state.loading || !this.props.ings) {
                orderSummary = <Spinner />;
            }
            else {
                orderSummary = <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancel={this.purchasableOffModeHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    totalPrice={this.props.price}

                />
            }
            burger = (this.props.ings) ? (<Aux>
                <Burger
                    ingredients={this.props.ings}
                />
                <BuildControls
                    // setDefaultPrice={this.setBackToStatingPrice}
                    totalPrice={this.props.price}
                    removeIng={this.props.removeIngredient}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ingredients={this.props.ings}
                    addIng={this.props.addIngredient}
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

const mapStatesToProps = ((state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        addIngredient: (ingType) => dispatch({ type: actionsTypes.ADD_INGREDIENT, ingType: ingType }),
        removeIngredient: (ingType) => dispatch({ type: actionsTypes.REMOVE_INGREDIENT, ingType: ingType })
    };
});

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxios));
