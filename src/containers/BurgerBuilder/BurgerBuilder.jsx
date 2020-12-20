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
import * as burgerBuilderActions from "../../store/actions/index";

export class BurgerBuilder extends Component {

    state = {
        purchaseMode: false,
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    PurchasableOnModeHandler = () => {
        if(this.props.isAuth){
            this.setState({ purchaseMode: true });
        }else{
            this.props.history.push('/auth');
        }
    };

    purchasableOffModeHandler = () => {
        this.setState({ purchaseMode: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
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
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.err ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (<Aux>
                <Burger
                    ingredients={this.props.ings}
                />
                <BuildControls
                    totalPrice={this.props.price}
                    removeIng={this.props.removeIngredient}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ingredients={this.props.ings}
                    addIng={this.props.addIngredient}
                    isAuth={this.props.isAuth}
                    onOrderClicked={this.PurchasableOnModeHandler} />
            </Aux>)

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.purchasableOffModeHandler}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.props.price}

            />
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
        ings: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        err: state.bbr.error,
        isAuth:state.auth.tokenId!==null,
        onBuildingBurger:state.bbr.building
    };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        addIngredient: (ingType) => dispatch(burgerBuilderActions.addIngredient(ingType)),
        removeIngredient: (ingType) => dispatch(burgerBuilderActions.removeIngredient(ingType)),
        initIngredients: () => dispatch(burgerBuilderActions.setInitIngredients()),
    };
});

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxios));
