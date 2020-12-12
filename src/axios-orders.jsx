import axios from "axios";

const ordersAxios = axios.create({
    baseURL:"https://my-burger-app-36539-default-rtdb.firebaseio.com"
});

export default ordersAxios;