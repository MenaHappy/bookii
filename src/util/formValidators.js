export const nameValidation = ( value ) => {
    return value.length < 3 ? "minimum 3 characaters required" : null;
};

//specific to egypt's cell phones change for your own needs
const phoneRegex = RegExp(/^[0-9]{11,11}/);
export const phoneValidation = ( value ) => {
    return phoneRegex.test(value) ? null: "invalid phone number";
};

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const emailValidation = ( value ) => {
    return emailRegex.test(value) ? null: "invalid email address";
};
