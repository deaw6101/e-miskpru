const express = require('express');
const route = express.Router();
const connection = require('../../config/connectMsql');
const verifyToken = require('../../auth/verifyToken');

const sql = require('mssql');


route.get('/', (req,res,next)=>{
    sql.connect(connection).then(() => {
      return sql.query`select * from tb_UserType`
    }).then(result => {
      res.json(1);
    }).catch(err => {
      // ... error checks
    })
    sql.close()
    connection.end();
    
})

module.exports = route;
