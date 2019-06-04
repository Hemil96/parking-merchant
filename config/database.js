module.exports = {
  // Mongo connection url
  connectionURL: process.env.MONGO_URL,
  dbOptions: {
    useMongoClient: process.env.USE_MONGO_CLIENT,
  },
};
