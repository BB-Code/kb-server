const IndexRouter = (server) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return 'hello hapi'
        }
    })
}

module.exports = IndexRouter;