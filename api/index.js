const Hapi = require('@hapi/hapi');
const Routers = require('./router');

(async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })
    
    await server.register([
        {
            plugin: Swagger,
            options: options
        }
    ])

    try {
        await server.start();
        console.log(`Server running at:`,server.info.uri)
    } catch (error) {
        console.error(error)
    }

    server.route(Routers)
})()