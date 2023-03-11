const Joi = require('joi');
const { findAllCard, InsertCard, UpdateCard, DeleteCard, findOneCard } = require('../db/cards');
const { cardModel } = require('../model/card');
const { message } = require('../model/common');
const prefix = "cards";
const CardsRouter = [
  {
    method: 'GET',
    path: `/${prefix}`,
    options: {
      tags: ['api'],
      auth: 'user-auth',
      description: '查询全部卡片笔记',
      validate: {
        query: Joi.object({
          limit: Joi.number().integer().min(0)
        }),
      },
      response: { schema: Joi.array().items(cardModel), failAction: 'log' }
    },
    handler: async (req) => {
      let [res] = await findAllCard(req.query.limit)
      return {
        'cards': res
      }
    }
  },
  {
    method: 'GET',
    path: `/${prefix}/{id}`,
    options: {
      tags: ['api'],
      auth: 'user-auth',
      description: '查询某条卡片笔记',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required()
        }).options({ stripUnknown: true })
      },
      response: { schema: cardModel, failAction: 'log' }
    },
    handler: async (req) => {
      let [res] = await findOneCard(req.params.id)
      return {
        'card': res
      }
    }
  },
  {
    method: 'POST',
    path: `/${prefix}`,
    options: {
      tags: ['api'],
      auth: 'user-auth',
      description: '添加卡片笔记',
      // plugins: {
      //   'hapi-swagger': {
      //     payloadType: 'form'
      //   }
      // },
      validate: {
        payload: Joi.object({
          title: Joi.string().max(150).required(),
          description: Joi.string().max(200),
          // cover: Joi.any().meta({ swaggerType: 'file' }).description('头像'),
          flag: Joi.string().max(100),
          tags: Joi.string().max(100),
          annotations: Joi.number().integer(),
          url: Joi.string(),
          folder: Joi.string().max(250),
        })
      },
      //   payload: {
      //     maxBytes: 1048576,
      //     parse: true,
      //     output: 'file'
      // },
      response: { schema: message, failAction: 'log' }
    },
    handler: async (req) => {
      const params = {
        title: req.payload.title,
        description: req.payload.description,
        flag: req.payload.flag,
        tags: req.payload.tags,
        annotations: req.payload.annotations,
        url: req.payload.url,
        folder: req.payload.folder
      };
      let res = await InsertCard(params)
      return {
        'message': res
      }
    }
  },
  {
    method: 'PUT',
    path: `/${prefix}/{id}`,
    options: {
      tags: ['api'],
      auth: 'user-auth',
      description: '更新卡片笔记',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required()
        }).options({ stripUnknown: true }),
        payload: Joi.object({
          title: Joi.string().max(150),
          description: Joi.string().max(200),
          // cover: Joi.any().meta({ swaggerType: 'file' }).description('头像'),
          flag: Joi.string().max(100),
          tags: Joi.string().max(100),
          annotations: Joi.number().integer(),
          url: Joi.string(),
          folder: Joi.string().max(250),
        })
      },
      response: { schema: message, failAction: 'log' }
    },
    handler: async (req) => {
      const params = {
        title: req.payload.title,
        description: req.payload.description,
        // cover: req.payload.cover,
        flag: req.payload.flag,
        tags: req.payload.tags,
        annotations: req.payload.annotations,
        url: req.payload.url,
        folder: req.payload.folder
      };
      let res = await UpdateCard(req.params.id, params)
      return {
        'message': res
      }
    }
  },

  {
    method: 'Delete',
    path: `/${prefix}/{id}`,
    options: {
      tags: ['api'],
      auth: 'user-auth',
      description: '删除卡片笔记',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().example('1')
        }).options({ stripUnknown: true })
      },
      response: { schema: message, failAction: 'log' }
    },
    handler: async (req) => {
      let res = await DeleteCard(req.params.id)
      return {
        'message': res
      }
    }
  }
]

module.exports = CardsRouter;