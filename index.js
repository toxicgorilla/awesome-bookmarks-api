const hapi = require("hapi");
const mongoose = require("mongoose");
const config = require("./config");
const Bookmark = require("./models/Bookmark");

const server = hapi.server({
  port: config.port,
  host: config.host
});

mongoose.connect(config.db);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

const init = async () => {
  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, reply) => `<h1>Bookmark GraphQl API</h1>`
    },
    {
      method: "GET",
      path: "/api/v1/bookmarks",
      handler: (request, reply) => Bookmark.find()
    },
    {
      method: "POST",
      path: "/api/v1/bookmarks",
      handler: (request, reply) => {
        const { name, url } = request.payload;
        const bookmark = new Bookmark({
          name,
          url
        });

        return bookmark.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
