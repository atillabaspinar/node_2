const path = require('path');
const adminData = require('./admin');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  res.render('shop', {
    prods: adminData.products,
    pageTitle: 'Shop',
    hasProduct: adminData.products.length > 0
  })
});

module.exports = router;
