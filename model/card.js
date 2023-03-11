const Joi = require('joi');

exports.cardModel = Joi.object({
  id: Joi.number().min(1),
  title: Joi.string(),
  starred: Joi.number(),
  description: Joi.string(),
  cover: Joi.any(),
  flag: Joi.string(),
  tags: Joi.string(),
  annotations: Joi.number(),
  url: Joi.string(),
  folder: Joi.string(),
  create_date: Joi.string(),
  ranking: Joi.number(),
  update_date: Joi.string(),
  is_delete: Joi.number()
}).label('Card Result');