const baseConfig = {
  port: 8001,
  dbUrl:
    "mongodb+srv://testuser:testuser@sociall-app-oskasieg.iigv8.mongodb.net/social-app?retryWrites=true&w=majority",
  secrets: {
    jwt: "learneverything",
    jwtExp: "100d",
  },
};

module.exports = baseConfig;
