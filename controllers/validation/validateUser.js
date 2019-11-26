const joi = require('joi');
/**
 * Joi schema to valiadte incoming request body
 */
const schema = joi.array().items(
    joi.object().keys({
        name: joi.string().min(3).required(),
        age: joi.number().required(),
        email: joi.string().email().required(),
        aadharNo: joi.number().integer().min(100000000000).max(999999999999).required()
    }).required()
)

/**
 * @function validate
 * @description: Method to validate request body against joi schema & return result
 * @param {*} data - Incoming request body
 */
module.exports = function validate(data){
    const {error} = joi.validate(data, schema);
    return error;
}
