var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var api = require('./api');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const app = express();
app
  .set('port', process.env.PORT || 8081)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use('/api', api)
  .use(express.static('static'))
  .use(morgan('dev'))
  .use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    res.json(err);
  })
  .listen(app.get('port'), function() {
    console.log('API server listening of port', app.get('port'));
  });
