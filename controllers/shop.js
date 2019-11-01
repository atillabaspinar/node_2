const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    User.findById(req.user._id)
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
exports.postOrder = (req, res, next) => {
    User.findById(req.user._id)
      .populate('cart.items.productId').then(user => {
        const products = user.cart.items.map(i => {
          return {
            quantity: i.quantity,
            product: {...i.productId._doc}
          };
        });
        const order = new Order({
          user: {
            name: user.name,
            userId: user
          },
          products: products
        });
        return order.save();
      })
      .then(result => {
        req.user.clearCart();
        res.redirect('/orders');
      })
      .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      let total = 0;
      for(let order of orders) {
        for(let p of order.products) {
          console.log('a', p.quantity * p.product.price);
          total = total + (p.quantity * p.product.price | 0);
          console.log('total', total);
        }        
      }
      console.log('total', total);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        total: total
      });
    })
    .catch(err => console.log(err));
};
