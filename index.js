const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


app.use('/api/login', require('./routes/api/login'));
app.use('/api/getdata/', require('./routes/api/getdata'));
app.use('/api/insert_customers/', require('./routes/api/insert_customers'));
app.use('/api/insert_salary/', require('./routes/api/insert_salary'));
app.use('/api/app_user', require('./routes/api/app_user'));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const port = process.env.PORT || 5000;
const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));