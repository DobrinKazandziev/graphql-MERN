import path from 'path';
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const types = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./"), { recursive: true }), {
  loaders: [new GraphQLFileLoader()]
});

module.exports = types
