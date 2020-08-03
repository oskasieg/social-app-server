const baseConfig = {
  port: 8000,
  dbUrl: 'mongodb://localhost:27017/oskasieg-blog',
  secrets: {
    jwt: 'learneverything',
    jwtExp: '100d',
  },
};

export default baseConfig;
