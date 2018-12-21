const Hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi');
const schema = require('./graphql/schema');
const config = require('./config');
const Bookmark = require('./models/Bookmark');

mongoose.connect(config.db);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

async function StartServer() {
  const server = new Hapi.server({
    port: config.port,
    host: config.host,
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema,
      },
      route: {
        cors: true,
      },
    },
  });

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql',
      },
      route: {
        cors: true,
      },
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => `<h1>Bookmark GraphQl API</h1>`,
    },
    {
      method: 'GET',
      path: '/api/v1/bookmarks',
      handler: (request, reply) => Bookmark.find(),
    },
    {
      method: 'POST',
      path: '/api/v1/bookmarks',
      handler: (request, reply) => {
        const { name, url } = request.payload;
        const bookmark = new Bookmark({
          name,
          url,
        });

        return bookmark.save();
      },
    },
  ]);

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

StartServer();
