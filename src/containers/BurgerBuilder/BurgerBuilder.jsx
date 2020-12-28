import React, { useState, useEffect } from "react";
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

export const BurgerBuilder = (props) => {

    const [purchaseMode, setPurchaseMode] = useState(false);

    useEffect(() => {
        props.initIngredients();
    }, []);

    const PurchasableOnModeHandler = () => {
        if (props.isAuth) {
            setPurchaseMode(true);
        } else {
            props.history.push('/auth');
        }
    };

    const purchasableOffModeHandler = () => {
        setPurchaseMode(false);
    };

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    };

    const updatePurchaseState = (ingredient) => {
        const sum = Object.keys(ingredient)
            .map(keyIg => {
                return ingredient[keyIg];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = props.err ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (props.ings) {
        burger = (<Aux>
            <Burger
                ingredients={props.ings}
            />
            <BuildControls
                totalPrice={props.price}
                removeIng={props.removeIngredient}
                purchasable={updatePurchaseState(props.ings)}
                ingredients={props.ings}
                addIng={props.addIngredient}
                isAuth={props.isAuth}
                onOrderClicked={PurchasableOnModeHandler} />
        </Aux>)

        orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseCancel={purchasableOffModeHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={props.price}

        />
    }

    return (
        <Aux>
            <Modal
                show={purchaseMode}
                closedModal={purchasableOffModeHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>

    );

}

const mapStatesToProps = ((state) => {
    return {
        ings: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        err: state.bbr.error,
        isAuth: state.auth.tokenId !== null,
        onBuildingBurger: state.bbr.building
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
