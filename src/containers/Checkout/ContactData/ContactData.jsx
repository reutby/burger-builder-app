import React, { Component } from "react";

import orderAxios from "../../../axios-orders";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Aux/Aux";
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
            });

    }

    render() {
        return (
            <Aux>
            {(this.state.loading) ? <Spinner /> : <div className={classes.ContactData}>
                <h4>Please Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" buttonClicked={this.orderHandler}>ORDER</Button>
                </form>

            </div>
         }
         </Aux>
        )
}
}

export default ContactData;
