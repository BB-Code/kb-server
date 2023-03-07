const Hapi = require('@hapi/hapi');
const Basic = require('@hapi/basic')
const config = require('./config');
const db = require('./db');
const {UpdateCard}  = require('./db/cards');
const { basicValidate } = require('./utils/auth');

const IndexRouter = require('./router');
const UserRouter = require('./router/user');

const init = async () => {
    const server = Hapi.server(config);
    await server.register(Basic);
    server.auth.strategy('user-auth', 'basic', { validate: basicValidate });
    IndexRouter(server);
    UserRouter(server);
    await server.start();
    console.log('server started on %s', server.info.uri);
    // InsertUser({
    //     username: 'lili',
    //     password: '12345678',
    //     cover: null,
    //     sex: 0,
    //     email: '123@123.com',
    //     boi: 'lili的简介'
    // })
    // UpdateCard(2,{
    //     title: '测试修改',
    //     description: null,
    //     cover: null,
    //     flag: null,
    //     tags: null,
    //     annotations:0,
    //     url:null,
    //     folder: null
    // })
};
process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

init();