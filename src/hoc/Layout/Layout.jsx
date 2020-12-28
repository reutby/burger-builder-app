import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prev) => (!prev.showSideDrawer));
    }

    return (
        <Aux>
            <ToolBar isAuth={props.isAuth} drawerToggle={sideDrawerToggleHandler} />
            <SideDrawer isAuth={props.isAuth} closed={sideDrawerClosedHandler} open={showSideDrawer} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>)

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.tokenId !== null
    }
}
export default connect(mapStateToProps, null)(Layout);