
const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product'
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);    
    const p = new Product(req.body.title);
    p.save();
    res.redirect('/');
};


exports.getProducts = (req, res, next) => {    
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',     
          });      
    });
  };