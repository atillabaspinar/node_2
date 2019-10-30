const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    let products = getDb().collection('products');
    let operation;
    if (this._id) {
      operation = products.insertOne(this);
    } else {
      operation = products.updateOne({_id: new mongoDb.ObjectId(this._id) }, {
        $set: this
      });
    }
    operation
    .then(result =>  console.log(result))
    .catch(err => console.log(err));
  }

  static fetchAll() {
    return getDb().collection('products').find().toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
  }

  static findById(id) {
    console.log(typeof id);
    return getDb().collection('products').findOne({_id: new mongoDb.ObjectId(id)})
    .then(product => {
      const prod = new Product(product.title, product.price, product.description, product.imageUrl);
      return prod;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Product;
