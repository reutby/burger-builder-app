import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../shared/utility"

const Auth = (props) => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: "email",
                placeholder: "Your Email"
            },
            label: 'Email',
            value: '',
            validation: {
                require: true,
                isEmail: true
            },
            valid: false,
            touch: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: "password",
                placeholder: "Password"
            },
            label: 'Password',
            value: '',
            validation: {
                require: true,
                minLength: 6
            },
            valid: false,
            touch: false
        }
    });

    const [isSignUp, setIsSignUp] = useState(true);

    const onSignClickedHandler = () => {
        setIsSignUp(prev => {
            return !prev;
        });
    }

    const onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        setControls((prev) => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value: value,
                    valid: checkValidity(value, { ...controls[name].validation }),
                    touch: true
                }
            }
        });

    }

    const createInputElements = () => {
        const inputsConfigArray = [];
        let inputsElements = null;
        for (let inputName in controls) {
            let { elementType, elementConfig, value, label, valid, touch } =
                controls[inputName];
            let configUpdate = {
                ...elementConfig,
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
    const authSubmitHandler = (event) => {
        event.preventDefault();
        const [emailVal, passwordVal] = [controls.email.value, controls.password.value];

        props.onAuth(emailVal, passwordVal, isSignUp);
    }

    let redirectPath = '/';
    if (props.isBurgerBuilding) {
        redirectPath = '/checkout'
    }

    return (
        <div className={classes.Auth}>
            {props.isAuth && <Redirect to={redirectPath} />}
            {props.error && <p style={{ color: 'red' }}>{props.error.message}</p>}
            {props.loading ? <Spinner /> : <form onSubmit={authSubmitHandler}>
                {createInputElements()}
                <Button btnType="Success"> SUBMIT</Button>
            </form>}

            <Button
                buttonClicked={onSignClickedHandler}
                btnType="Danger">SWITCH TO {!isSignUp ? 'SIGN UP' : 'SIGN IN'} </Button>
        </div>
    );


};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.tokenId !== null,
        isBurgerBuilding: state.bbr.building
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);