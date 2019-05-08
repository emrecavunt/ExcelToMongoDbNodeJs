const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const foodsRoutes = require('./api/routes/foods');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://dbEmre:' + process.env.MONGO_ATLAS_PW + process.env.MONGO_ATLAS_CONNECTION , {
    useNewUrlParser: true,
    useCreateIndex: true, 
});
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/api/foods', foodsRoutes);
app.use('/api/user', userRoutes);
app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


module.exports = app;