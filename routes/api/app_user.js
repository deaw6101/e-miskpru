const express = require('express');
const route = express.Router();
const connection = require('../../config/connectMysql');
const verifyToken = require('../../auth/verifyToken');

route.get('/', (req,res,next)=>{
    connection.connect();
    connection.query('SELECT * from app_user', function (error, results, fields) {
      // if (error) throw error;
       res.json(results);
    });
     connection.end();
     
})

module.exports = route;
