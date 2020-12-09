import React from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
const Layout = (props)=>(
    <Aux>
    <div>ToolBar , SideDrow, BackDrop</div>
    <main className={classes.Content}>
    {props.children}
    </main>
    </Aux>
);

export default Layout;