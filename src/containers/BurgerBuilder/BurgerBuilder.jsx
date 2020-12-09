import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 2
        }
    }
    removeIngredientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        copyIg[type]--;
        this.setState((prev) => ({ ...prev, ["ingredients"]: copyIg }));
        console.log("removing " + type + " ingredient",this.state.ingredients);
    };

    addIngredeientHandler = (type) => {
        const copyIg = { ...this.state.ingredients };
        copyIg[type]++;
        this.setState((prev) => ({ ...prev, ["ingredients"]: copyIg }));
       };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls removeIng={this.removeIngredientHandler} addIng={this.addIngredeientHandler} />
            </Aux>

        );
    }
}

export default BurgerBuilder;
