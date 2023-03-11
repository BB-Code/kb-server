const Joi = require('joi');
const { findAllCard, InsertCard, UpdateCard, DeleteCard, findOneCard } = require('../db/cards');

const cardModel = Joi.object({
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
      response: { failAction: 'log'}
    },
    handler: async (req) => {
      let [res] = await findAllCard(req.params.limit)
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
      response: { schema: cardModel,failAction: 'log'}
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
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          title: Joi.string().max(150).required(),
          description: Joi.string().max(200),
          cover: Joi.any().meta({ swaggerType: 'file' }).description('头像'),
          flag: Joi.string().max(100),
          tags: Joi.string().max(100),
          annotations: Joi.number().integer(),
          url: Joi.string(),
          folder: Joi.string().max(250),
        })
      }
    },
    handler: async (req) => {
      const params = {
        title: req.payload.title,
        description: req.payload.description,
        cover: req.payload.cover,
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
      description: '更新卡片笔记'
    },
    handler: async (req) => {
      const params = {
        title: req.payload.title,
        description: req.payload.description,
        cover: req.payload.cover,
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
      }
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