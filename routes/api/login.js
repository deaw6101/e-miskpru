const express = require('express');
const route = express.Router();
const pool = require('../../config/connectMysql');
const verifyToken = require('../../auth/verifyToken');

const jwt = require('jsonwebtoken');

route.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection(function(err, connection) {
        if (err) throw err;
            const sql = "SELECT * from tb_admin where admin_user = ? and admin_password = md5(?)";
            connection.query(sql, [username, password], function (error, results, fields) {
                // if (error) throw error;
                if(results.length == 1){
                    const user = {
                        id: 1,
                        email: username
                    }
                    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                        res.json({
                            token
                        });
                    });
                } else {
                    res.json({
                        results
                    });
                }
                connection.release();
                if (error) throw error;
        });
    });
})

module.exports = route;