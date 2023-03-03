const UserRouter = (server) =>{
    server.route({
        method: 'GET',
        path: '/user/bobo',
        options:{
            auth: 'user-auth'
        },
        handler: (req,h)=>{
            return 'hello bobo'
        }
    })
}

module.exports = UserRouter;