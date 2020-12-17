import React, { Component } from "react";
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
class ContactData extends Component {

    state = {
        orderForm: orderConfig,
        formIsValid: false,
    }

    checkValidity = (value, rules) => {
        if (!rules) {
            return true;
        }
        let isValid = true;

        if (rules.require) {
            isValid = (value.trim() !== '' && isValid);
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength && isValid);
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        const costumer = {};
        for (let inputElement in this.state.orderForm) {
            costumer[inputElement] = this.state.orderForm[inputElement].value;
        }
       
        const { value: deliveryMethodValue } = this.state.orderForm.deliveryMethod;
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: costumer,
            deliveryMethod: deliveryMethodValue
        };
        console.log(order);
        this.props.purchaseBurger(order,this.props.history,this.props.token);
        
    }
    onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        const validationRules = {
            ...this.state.orderForm[name].validation
        }
        const isValid = this.checkValidity(value, validationRules);

        let isFormValid = true;
        for (let inputElement in this.state.orderForm) {

            isFormValid = this.state.orderForm[inputElement].valid && isFormValid;
        }
        console.log(isFormValid);
        this.setState((prev) => {
            return {
                formIsValid: isFormValid,
                orderForm: {
                    ...prev.orderForm,
                    [name]: {
                        ...prev.orderForm[name],
                        value: value,
                        valid: isValid,
                        touch: true
                    }
                }
            }
        });
    }
    createInputElements = () => {
        const inputsConfigArray = [];
        let inputsElements = null;
        for (let inputName in this.state.orderForm) {
            let { elementType, elementConfig, value, label, valid, touch } =
                this.state.orderForm[inputName];
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
                onChange={this.onChangeInputHandler}
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                value={input.value}
                label={input.label}
            />
        });
        return inputsElements;
    }
    render() {
        const inputsElements = this.createInputElements();

        return (
            <Aux>
                {(this.props.loading) ? <Spinner /> :
                    <div className={classes.ContactData}>
                        <h4>Please Enter Your Contact Data</h4>
                        <form>
                            {inputsElements}
                            <Button disabled={!this.state.formIsValid} btnType="Success" buttonClicked={this.orderHandler}>ORDER</Button>
                        </form>

                    </div>}
            </Aux>
        )
    }
}

const mapStatesToProps = ((state) => {
    return {
        ings: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        loading:state.order.loading,
        token:state.auth.tokenId
    };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        purchaseBurger: (order,history,token)=> dispatch(ActionsCreators.purchasableBurger(order,history,token))
    };
});

export default connect(mapStatesToProps,mapDispatchToProps)(withErrorHandler(ContactData,orderAxios));
