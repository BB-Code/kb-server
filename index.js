const Hapi = require('@hapi/hapi');
const Basic = require('@hapi/basic')
const config = require('./config');
const db = require('./db');
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
};
process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

init();