const { findAllUser, InsertUser, UpdateUser, DeleteUser, findOneUser } = require('../db/user');

const prefix = "users";
const UserRouter = (server) => {
    server.route({
        method: 'GET',
        path: `/${prefix}`,
        options: {
            auth: 'user-auth'
        },
        handler: async () => {
            let [res] = await findAllUser()
            return {
                'users': res
            }
        }
    });
    server.route({
        method: 'GET',
        path: `/${prefix}/{id}`,
        options: {
            auth: 'user-auth'
        },
        handler: async (req) => {
            let [res] = await findOneUser(req.params.id)
            return {
                'user': res
            }
        }
    });
    server.route({
        method: 'POST',
        path: `/${prefix}`,
        options: {
            auth: 'user-auth'
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
    });
    server.route({
        method: 'PUT',
        path: `/${prefix}/{id}`,
        options: {
            auth: 'user-auth'
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
    });

    server.route({
        method: 'Delete',
        path: `/${prefix}/{id}`,
        options: {
            auth: 'user-auth'
        },
        handler: async (req) => {
            let res = await DeleteUser(req.params.id)
            return {
                'message': res
            }
        }
    });
}

module.exports = UserRouter;