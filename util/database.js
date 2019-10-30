const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  mongoClient.connect('mongodb://localhost')
  .then(client => {
    console.log('connected');
    _db = client.db('shop');
    console.log(_db);
    
    callback(client);
  }).catch(err => {
    console.log(err);  
    throw err;
  });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No db found';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


