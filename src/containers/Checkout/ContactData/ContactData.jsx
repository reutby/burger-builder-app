import React, { useState } from "react";
import { connect } from "react-redux";
import orderAxios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
import Input from "../../../components/UI/Input/Input";
import orderConfig from "./orderConfig/orderConfig";
import * as ActionsCreators from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidity } from "../../../shared/utility";

const ContactData = (props) => {

    const [orderForm, setOrderForm] = useState(orderConfig);
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const costumer = {};
        for (let inputElement in orderForm) {
            costumer[inputElement] = orderForm[inputElement].value;
        }

        const { value: deliveryMethodValue } = orderForm.deliveryMethod;
        const order = {
            ingredients: props.ings,
            price: props.price,
            customer: costumer,
            deliveryMethod: deliveryMethodValue,
            userId: props.userId
        };

        props.purchaseBurger(order, props.history, props.token);

    }

    const onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        const validationRules = {
            ...orderForm[name].validation
        }
        const isValid = checkValidity(value, validationRules);

        let isFormValid = true;
        for (let inputElement in orderForm) {

            isFormValid = orderForm[inputElement].valid && isFormValid;
        }
        setOrderForm((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value: value,
                    valid: isValid,
                    touch: true
                }
            }
        });

        setFormIsValid(isFormValid);

    }

    const createInputElements = () => {
        const inputsConfigArray = [];
        let inputsElements = null;
        for (let inputName in orderForm) {
            let { elementType, elementConfig, value, label, valid, touch } =
                orderForm[inputName];
            let configUpdate = {
                ...elementConfig
            }
            configUpdate = {
                ...configUpdate,
                name: inputName
            }
            inputsConfigArray.push({
                elementType: elementType,
                elementConfig: configUpdate,
                value: value,
                label: label,
                valid: valid,
                touch: touch

            });
        }

        inputsElements = inputsConfigArray.map((input) => {
            return <Input
                isTouch={input.touch}
                invalid={!(input.valid)}
                key={input.elementConfig.name}
                onChange={onChangeInputHandler}
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                value={input.value}
                label={input.label}
            />
        });
        return inputsElements;
    }

    const inputsElements = createInputElements();

    return (
        <Aux>
            {(props.loading) ? <Spinner /> :
                <div className={classes.ContactData}>
                    <h4>Please Enter Your Contact Data</h4>
                    <form>
                        {inputsElements}
                        <Button disabled={!formIsValid} btnType="Success" buttonClicked={orderHandler}>ORDER</Button>
                    </form>

                </div>}
        </Aux>
    )

}

const mapStatesToProps = ((state) => {
    return {
        ings: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        loading: state.order.loading,
        token: state.auth.tokenId,
        userId: state.auth.userId
    };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        purchaseBurger: (order, history, token) => dispatch(ActionsCreators.purchasableBurger(order, history, token))
    };
});

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHandler(ContactData, orderAxios));
