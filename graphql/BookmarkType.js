const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookmarkType = new GraphQLObjectType({
  name: 'Bookmark',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

module.exports = BookmarkType;
