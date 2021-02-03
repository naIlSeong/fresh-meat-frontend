module.exports = {
  client: {
    tagName: "gql",
    includes: ["./src/**/*.tsx"],
    service: {
      name: "fresh-meat-backend",
      url: "http://127.0.0.1:4000/graphql",
    },
  },
};
