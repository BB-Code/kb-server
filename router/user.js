const Joi = require('joi');
const { findAllUser, InsertUser, UpdateUser, DeleteUser, findOneUser } = require('../db/user');
const { userModel } = require('../model/user');
const { message } = require('../model/common');

const prefix = "users";
const UserRouter = [
    {
        method: 'GET',
        path: `/${prefix}`,
        options: {
            tags: ['api'],
            auth: 'user-auth',
            description: '查询所有用户',
            validate: {
                query: Joi.object({
                    limit: Joi.number().integer().min(0)
                }),
            },
            response: { schema: Joi.array().items(userModel), failAction: 'log' }
        },
        handler: async (req) => {
            let [res] = await findAllUser(req.query.limit);
            return {
                'users': res
            }
        }
    },
    {
        method: 'GET',
        path: `/${prefix}/{id}`,
        options: {
            tags: ['api'],
            auth: 'user-auth',
            description: '查询某个用户',
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }).options({ stripUnknown: true })
            },
            response: { schema: userModel, failAction: 'log' }
        },
        handler: async (req) => {
            let [res] = await findOneUser(req.params.id)
            return {
                'user': res
            }
        }
    },
    {
        method: 'POST',
        path: `/${prefix}`,
        options: {
            tags: ['api'],
            auth: 'user-auth',
            description: '新增用户',
            validate: {
                payload: Joi.object({
                    username: Joi.string().max(50).required(),
                    password: Joi.string().max(32),
                    // cover: Joi.any().meta({ swaggerType: 'file' }).description('头像'),
                    sex: Joi.number(),
                    email: Joi.string().max(100),
                    boi: Joi.string().max(200)
                })
            },
            response: { schema: message, failAction: 'log' }
        },
        handler: async (req) => {
            const params = {
                username: req.payload.username,
                password: req.payload.password,
                // cover: req.payload.cover,
                sex: req.payload.sex,
                email: req.payload.email,
                boi: req.payload.boi
            };
            let res = await InsertUser(params)
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
            description: '更新用户',
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                  }).options({ stripUnknown: true }),
                payload: Joi.object({
                    username: Joi.string().max(50),
                    password: Joi.string().max(32),
                    // cover: Joi.any().meta({ swaggerType: 'file' }).description('头像'),
                    sex: Joi.number(),
                    email: Joi.string().max(100),
                    boi: Joi.string().max(200)
                })
            },
            response: { schema: message, failAction: 'log' }
        },
        handler: async (req) => {
            const params = {
                username: req.payload.username,
                password: req.payload.password,
                // cover: req.payload.cover,
                sex: req.payload.sex,
                email: req.payload.email,
                boi: req.payload.boi
            };
            let res = await UpdateUser(req.params.id, params)
           
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
            description: '删除用户',
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().example('1')
                }).options({ stripUnknown: true })
            },
            response: { schema: message, failAction: 'log' }
        },
        handler: async (req) => {
            let res = await DeleteUser(req.params.id)
            return {
                'message': res
            }
        }
    }
]

module.exports = UserRouter;