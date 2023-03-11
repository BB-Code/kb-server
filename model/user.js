const Joi = require('joi');

exports.userModel = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    starred: Joi.number(),
    description: Joi.string(),
    sex: Joi.number(),
    email: Joi.string(),
    boi: Joi.string()
}).label('User Result');
