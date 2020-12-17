import React from "react";
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/Orders" > Orders</NavigationItem>
        {props.isAuth && <NavigationItem link="/" exact> Burger Builder</NavigationItem>}
        {!props.isAuth ? <NavigationItem link="/auth" exact> Authenticate</NavigationItem>
        : <NavigationItem link="/logout" exact> Logout</NavigationItem>}
    </ul>

);

export default NavigationItems;