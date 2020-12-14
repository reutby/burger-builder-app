import React, { Component } from "react";
import orderAxios from "../../axios-orders";
import Order from "../../components/order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        console.log("[orders] mount")
        orderAxios.get("/orders.json")
            .then(res => {
                const resdata = res.data;
                const updateOrders = [];
                console.log(resdata);
                for (let key in resdata) {
                    updateOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(updateOrders);
                this.setState({ loading: false, orders: updateOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }
    render() {
        let updateOrder = <Spinner />;

        if (!this.state.loading) {
            updateOrder = this.state.orders.map(order => {
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
export default withErrorHandler(Orders, orderAxios);