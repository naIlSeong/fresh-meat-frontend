module.exports = {
  client: {
    tagName: "gql",
    includes: ["./src/**/*.tsx"],
    service: {
      name: "fresh-meat-backend",
      url:
        process.env.NODE_ENV === "production"
          ? process.env.API_DOMAIN
          : "https://localhost:4000/graphql",
      skipSSLValidation: true,
    },
  },
};
