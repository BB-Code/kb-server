const { findAllUser, InsertUser, UpdateUser, DeleteUser, findOneUser } = require('../db/user');

const prefix = "users";
const UserRouter = [
    {
        method: 'GET',
        path: `/${prefix}`,
        options: {
            tags: ['api'],
            auth: 'user-auth',
            description: '查询所有用户'
        },
        handler: async () => {
            let [res] = await findAllUser()
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
            description: '查询某个用户'
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
            description: '新增用户'
        },
        handler: async (req) => {
            const params = {
                username: req.payload.username,
                password: req.payload.password,
                cover: req.payload.cover,
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
            description: '更新用户'
        },
        handler: async (req) => {
            const params = {
                username: req.payload.username,
                password: req.payload.password,
                cover: req.payload.cover,
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
            description: '删除用户'
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