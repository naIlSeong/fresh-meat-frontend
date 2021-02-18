module.exports = {
  client: {
    tagName: "gql",
    includes: ["./src/**/*.tsx"],
    service: {
      name: "fresh-meat-backend",
      url: "https://localhost:4000/graphql",
      skipSSLValidation: true,
    },
  },
};
