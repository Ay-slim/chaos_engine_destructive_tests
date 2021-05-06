const joi = require ('joi')

const optionsSchema = joi.object({
    functionToTest: joi.function().required(),
    numOfInputs: joi.number().integer().min(1).max(10).required().messages({
        "any.required": "number of inputs is required",
        "number.base": "number of inputs should be a number",
        "number.min": "number of inputs cannot be less than 1",
        "number.max": "number of inputs cannot be greater than 10"
    }),
    customInputs: joi.array(),
    returnsPromise: joi.boolean()
})

module.exports = optionsSchema