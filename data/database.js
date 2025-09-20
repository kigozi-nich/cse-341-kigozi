const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
let database;

const initDb = (callback) => {
  if (database) {
    console.log('DB is already initialized!');
    callback(null, database);
    return;
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db(); // Get the database from the client
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
