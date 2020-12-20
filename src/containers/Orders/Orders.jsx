import React, { Component } from "react";
import { connect } from "react-redux"

import * as actions from "../../store/actions/index";
import orderAxios from "../../axios-orders";
import Order from "../../components/order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let updateOrder = <Spinner />;

        if (!this.props.loading) {
            updateOrder = this.props.orders.map(order => {
                return (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)
            }
            );
        }
        return (
            <div>
                {updateOrder}
            </div>)
    }

}

const mapStatesToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.tokenId,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(withErrorHandler(Orders, orderAxios));