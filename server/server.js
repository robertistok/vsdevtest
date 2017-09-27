const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./router');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(router);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.set('port', process.env.PORT || 3010);

const server = app.listen(app.get('port'), () => {
  console.log(`The app is listening on port ${app.get('port')}`);
});
