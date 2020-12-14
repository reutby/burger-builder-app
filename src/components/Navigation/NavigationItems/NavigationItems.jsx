import React from "react";
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/Orders" > Orders</NavigationItem>
        <NavigationItem link="/" exact> Burger Builder</NavigationItem>
        
    </ul>

);

export default NavigationItems;