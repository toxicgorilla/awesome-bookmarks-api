const graphql = require('graphql');
const BookmarkType = require('./BookmarkType');
const Bookmark = require('../models/Bookmark');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bookmark: {
      type: BookmarkType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Bookmark.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
