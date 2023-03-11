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
  }).label('Cards Result');
  

  exports.cardMessage =  Joi.object({
    "message": Joi.object({
      "fieldCount": Joi.number(),
      "affectedRows": Joi.number(),
      "insertId": Joi.number(),
      "info": Joi.string(),
      "serverStatus": Joi.number(),
      "warningStatus": Joi.number()
    })
  })