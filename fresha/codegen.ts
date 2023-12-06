import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://0.0.0.0:3000/graphql",
  documents: ["app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./app/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
