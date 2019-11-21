const express = require('express');
const route = express.Router();
const pool = require('../../config/connectMysql');
const verifyToken = require('../../auth/verifyToken');


route.post('/', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    const customers_pname = req.body.prename;
    const customers_name = req.body.customers_name;
    const customers_lname = req.body.customers_lname;
    const customers_type = req.body.type_customer;
    const customers_bank = req.body.bank;
    const customers_status = req.body.customer_status;


    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `INSERT into tb_customers(customers_citizent, customers_pname, customers_name, customers_lname, customers_type, customers_bank, customers_status) `;
        const sql2 = ` values('${customers_citizent}','${customers_pname}','${customers_name}','${customers_lname}','${customers_type}','${customers_bank}','${customers_status}')`;
        connection.query(sql + sql2, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/getdata_for_edit_customers', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `select * from tb_customers where customers_citizent = '${customers_citizent}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/getdata_for_edit_customers_salary', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `select * from tb_history_salary where customers_citizent = '${customers_citizent}' order by history_salary_salary DESC`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/updatedata_for_edit_customers', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    const customers_pname = req.body.prename;
    const customers_name = req.body.name;
    const customers_lname = req.body.lname;
    const customers_type = req.body.type_customer;
    const customers_bank = req.body.bank;
    const customers_status = req.body.customers_status;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `UPDATE tb_customers SET customers_citizent = '${customers_citizent}', customers_pname = '${customers_pname}' ,customers_name = '${customers_name}', customers_lname = '${customers_lname}', customers_type ='${customers_type}' , customers_bank ='${customers_bank}' , customers_status ='${customers_status}' where customers_citizent = '${customers_citizent}' `;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/delete_data_for_edit_customers', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `DELETE FROM tb_customers where customers_citizent = '${customers_citizent}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})

route.post('/check_bank_for_edit_customers', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `select *  FROM tb_account_bank where customers_citizent = '${customers_citizent}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})


route.post('/insert_bank_detail', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    const bank_id = req.body.bank_id;
    const account_number = req.body.account_number;
    const account_type = req.body.id_account_type;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `INSERT into tb_account_bank(customers_citizent, bank_id, account_number, account_type) `;
        const sql2 = ` values('${customers_citizent}','${bank_id}','${account_number}','${account_type}')`;
        connection.query(sql + sql2, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/update_bank_detail', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    const bank_id = req.body.bank_id;
    const account_number = req.body.account_number;
    const account_type = req.body.id_account_type;
    
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `UPDATE tb_account_bank SET  bank_id = '${bank_id}' ,account_number = '${account_number}', account_type = '${account_type}' where customers_citizent = '${customers_citizent}' `;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/insert_salary', (req, res, next) => {
    const customers_citizent = req.body.customers_citizent;
    const history_salary_month = req.body.history_salary_month;
    const history_salary_salary = req.body.history_salary_salary;
    const history_salary_year = req.body.history_salary_year;
    

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `INSERT into tb_history_salary(customers_citizent, history_salary_month, history_salary_salary, history_salary_year) `;
        const sql2 = ` values('${customers_citizent}','${history_salary_month}','${history_salary_salary}','${history_salary_year}')`;
        connection.query(sql + sql2, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/customer_type_list', (req, res, next) => {
    const customers_type = req.body.customers_type;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `SELECT * from tb_customers left join tb_customer_type on tb_customers.customers_type = tb_customer_type.customer_type_id left join tb_customer_status on tb_customers.customers_status = tb_customer_status.customer_status_id left join tb_bank on tb_customers.customers_bank = tb_bank.bank_id  where customers_type = '${customers_type}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})

module.exports = route;