const orderConfig = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Your Name"
        },
        label:'Name',
        value:'',
        validation:{
            require:true
        },
        valid:false,
        touch:false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: "email",
            placeholder: "Your Email"
        },
        label:'Email',
        value:'',
        validation:{
            require:true,
            isEmail :true
        },
        valid:false,
        touch:false
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Country"
        },
        label:'Country',
        value:'',
        validation:{
            require:true
        },
        valid:false,
        touch:false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "Street"
        },
        label:'Street',
        value:'',
        validation:{
            require:true,
        },
        valid:false,
        touch:false
    },
    postalCode: {
        elementType: 'input',
        elementConfig: {
            type: "text",
            placeholder: "ZIP Code"
        },
        label:"Postal Code",
        value:'',
        validation:{
            require:true,
            minLength:5,
            maxLength:5,
        },
        valid:false,
        touch:false
    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }]

        },
        label:"Delivery Method",
        value:'',
        valid:true,
        touch:true
    }
}

export default orderConfig;