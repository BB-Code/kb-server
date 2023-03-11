const Hapi = require('@hapi/hapi');
const Basic = require('@hapi/basic');
const Swagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const config = require('./config');
require('./db');
const { basicValidate } = require('./utils/auth');
const Routers = require('./router');
const Pack = require('./package.json');

const options = {
    info: {
        title: `${Pack.name.toUpperCase()} API Documentation`,
        version: Pack.version,
    },
};

const init = async () => {
    const server = Hapi.server(config);
    await server.register([Basic, Inert,Vision,{
        plugin: Swagger,
        options: options
    }]);
    server.auth.strategy('user-auth', 'basic', { validate: basicValidate });
    server.route(Routers);
    await server.start();
    console.log('server started on %s', server.info.uri);
};
process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
});

init();