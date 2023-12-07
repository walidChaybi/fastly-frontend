module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "Fastly-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
