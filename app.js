const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.find({name: 'Atilla'})
    .then(users => {
      if (users.length > 0) {
      const user = users[0];
      req.user = user;
      next();
      }
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb://localhost:27017/shop')
  .then(result => {
    const atilla = new User({
      name:'Atilla',
      email: 'atilla@a.com',
      cart: {
        items: []
      }
    });
    User.find({name: 'Atilla'}).then(user => {
      if (user.length === 0) {

        atilla.save();
      }
    }).catch(err => {
      console.log(err);
    });
    
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
