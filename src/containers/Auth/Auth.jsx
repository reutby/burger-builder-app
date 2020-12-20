import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import {checkValidity} from "../../shared/utility"
class Auth extends Component {

    state = {
        controls: {
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
        },
        isSignUp: true
    }

    onSignClickedHandler = () => {
        this.setState(prev => {
            return {
                isSignUp: !prev.isSignUp
            }
        });
    }

    onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        this.setState((prev) => {
            return {
                controls: {
                    ...prev.controls,
                    [name]: {
                        ...prev.controls[name],
                        value: value,
                        valid: checkValidity(value, { ...this.state.controls[name].validation }),
                        touch: true
                    }
                }
            }
        });

    }

    createInputElements = () => {
        const inputsConfigArray = [];
        let inputsElements = null;
        for (let inputName in this.state.controls) {
            let { elementType, elementConfig, value, label, valid, touch } =
                this.state.controls[inputName];
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
                onChange={this.onChangeInputHandler}
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                value={input.value}
                label={input.label}
            />
        });
        return inputsElements;
    }
    authSubmitHandler = (event) => {
        event.preventDefault();
        const [emailVal, passwordVal] = [this.state.controls.email.value, this.state.controls.password.value];

        this.props.onAuth(emailVal, passwordVal, this.state.isSignUp);
    }
    render() {
        let redirectPath = '/';
        if (this.props.isBurgerBuilding) {
            redirectPath ='/checkout'
        }

        return (
            <div className={classes.Auth}>
                {this.props.isAuth && <Redirect to={redirectPath} />}
                {this.props.error && <p style={{ color: 'red' }}>{this.props.error.message}</p>}
                {this.props.loading ? <Spinner /> : <form onSubmit={this.authSubmitHandler}>
                    {this.createInputElements()}
                    <Button btnType="Success"> SUBMIT</Button>
                </form>}

                <Button
                    buttonClicked={this.onSignClickedHandler}
                    btnType="Danger">SWITCH TO {!this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'} </Button>
            </div>
        );

    }
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