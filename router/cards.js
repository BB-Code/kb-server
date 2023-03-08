const { findAllCard, InsertCard, UpdateCard, DeleteCard, findOneCard } = require('../db/cards');

const prefix = "cards";
const CardsRouter = (server) => {
  server.route({
    method: 'GET',
    path: `/${prefix}`,
    options: {
      auth: 'user-auth'
    },
    handler: async () => {
      let [res] = await findAllCard()
      return {
        'cards': res
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
      let [res] = await findOneCard(req.params.id)
      return {
        'card': res
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
        title: req.payload.title,
        description: req.payload.description,
        cover: req.payload.cover,
        flag: req.payload.flag,
        tags: req.payload.tags,
        annotations: req.payload.annotations,
        url: req.payload.url,
        folder: req.payload.folder
      };
      let res = await InsertCard(params)
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
        title: req.payload.title,
        description: req.payload.description,
        cover: req.payload.cover,
        flag: req.payload.flag,
        tags: req.payload.tags,
        annotations: req.payload.annotations,
        url: req.payload.url,
        folder: req.payload.folder
      };
      let res = await UpdateCard(req.params.id, params)
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
      let res = await DeleteCard(req.params.id)
      return {
        'message': res
      }
    }
  });
}

module.exports = CardsRouter;