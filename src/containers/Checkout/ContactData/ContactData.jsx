import React, { Component } from "react";

import orderAxios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
import Input from "../../../components/UI/Input/Input";
import orderConfig from "./orderConfig/orderConfig";
class ContactData extends Component {

    state = {
        orderForm: orderConfig,
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        if(!rules){
            return true;
        }
        let isvalid = true;

        if (rules.require) {
            isvalid = (value.trim() !== '' && isvalid);
        }
        if (rules.emailStructure) {
            isvalid = value.includes('@') && value.includes('.') && isvalid;
        }
        if (rules.minLength) {
            isvalid = (value.length >= rules.minLength && isvalid);
        }
        if (rules.maxLength) {
            isvalid = value.length <= rules.maxLength && isvalid;
        }
        return isvalid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const costumer = {};
        for (let inputElement in this.state.orderForm) {
            costumer[inputElement] = this.state.orderForm[inputElement].value;
        }
        console.log(costumer);
        const { value: deliveryMethodValue } = this.state.orderForm.deliveryMethod;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: costumer,
            deliveryMethod: deliveryMethodValue
        };
        console.log(order);
        orderAxios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            })
            .catch(err => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            });

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
                {(this.state.loading) ? <Spinner /> :
                    <div className={classes.ContactData}>
                        <h4>Please Enter Your Contact Data</h4>
                        <form>
                            {inputsElements}
                            <Button disabled ={!this.state.formIsValid} btnType="Success" buttonClicked={this.orderHandler}>ORDER</Button>
                        </form>

                    </div>}
            </Aux>
        )
    }
}

export default ContactData;
