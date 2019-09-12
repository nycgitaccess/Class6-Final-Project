const Validator = require('validator');
const isEmpty = require('./check');

module.exports = function validateRegisterInput(data) {

    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    

    if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Name field is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 character"
    }
    return {
        errors,
        isValid: isEmpty(errors)
      };

}