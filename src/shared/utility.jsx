export const updateObject =(oldObject,updateProperties)=>{
    return {
        ...oldObject,
        ...updateProperties
    }
}

export const checkValidity = (value, rules) => {
    if (!rules) {
        return true;
    }
    let isValid = true;

    if (rules.require) {
        isValid = (value.trim() !== '' && isValid);
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.minLength) {
        isValid = (value.length >= rules.minLength && isValid);
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
}
