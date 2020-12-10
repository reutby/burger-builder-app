import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {

    state={showSideDrawer:false};

    sideDrawerClosedHandler =() =>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prev)=>({showSideDrawer: !prev.showSideDrawer}));
    }
    render() {
        return (
            <Aux>
                <ToolBar drawerToggle={this.sideDrawerToggleHandler}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }
}

export default Layout;