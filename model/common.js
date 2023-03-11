const Joi = require('joi');

exports.message = Joi.object({
    "message": Joi.object({
        "fieldCount": Joi.number(),
        "affectedRows": Joi.number(),
        "insertId": Joi.number(),
        "info": Joi.string(),
        "serverStatus": Joi.number(),
        "warningStatus": Joi.number()
    })
})