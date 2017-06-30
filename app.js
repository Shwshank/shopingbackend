const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const config = require('./config/const');
const regUser = require('./api/user/regUser');
const regFbUser = require('./api/user/regFbUser');
const regGmailUser = require('./api/user/regGmailUser');
const changeLoginStatus = require('./api/user/changeLoginStatus');
const setCategory = require('./api/product/setCategory');
const getCategory = require('./api/product/getCategory');
const setProduct = require('./api/product/setProduct');
const getProduct = require('./api/product/getProduct');
const setCart = require('./api/cart/setCart');
const getCart = require('./api/cart/getCart');
const setOrder = require('./api/cart/setOrder');
const getOrder = require('./api/cart/getOrder');

require('./util/passport')(passport);

const app = express();
app.use(bodyParser.json());
//app.use(morgan('combined'));

//app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log("Database connected");
});

mongoose.connection.on('error', (error) =>{
	console.log('Database error '+error);
});

app.listen(4000, ()=>{
	console.log("Now Ready @4000");
});

app.use('/api/regUser',regUser);
app.use('/api/regFbUser',regFbUser);
app.use('/api/regGmailUser',regGmailUser);
app.use('/api/loginStatus',changeLoginStatus);

app.use('/api/setCategory',setCategory);
app.use('/api/getCategory',getCategory);
app.use('/api/setProduct',setProduct);
app.use('/api/getProduct',getProduct);

app.use('/api/setCart',setCart);
app.use('/api/getCart',getCart);
app.use('/api/setOrder',setOrder);
app.use('/api/getOrder',getOrder);

app.all(/^\/.*/, function (req, res) {
    res.send('404 , please check the URL'); // Any other url except pre defined
});
