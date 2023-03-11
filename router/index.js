const UserRouter = require('./user');
const CardsRouter = require('./cards');

const IndexRouter = [
    ...UserRouter,
    ...CardsRouter,
    {
        method: 'GET',
        path: '/',
        options: {
            tags: ['api'],
            description: '首页'
        },
        handler: (req, h) => {
            return 'hello hapi'
        }
    },
]

module.exports = IndexRouter;