const express = require('express');
const route = express.Router();
const pool = require('../../config/connectMysql');
const verifyToken = require('../../auth/verifyToken');


route.get('/getbank', (req,res,next)=>{
   pool.getConnection(function(err, connection) {
      if (err) throw err;
         connection.query('SELECT * from tb_bank', function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;
      });
    });
})

route.get('/customer_type', (req,res,next)=>{
   pool.getConnection(function(err, connection) {
      if (err) throw err;
         connection.query('SELECT * from tb_customer_type', function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;
      });
   });
})

route.get('/customer_status', (req,res,next)=>{
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('SELECT * from tb_customer_status', function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;
      });
   });
})

route.get('/customer_manage/:payslip_year/:payslip_month', (req,res,next)=>{
   const payslip_year = req.param('payslip_year');
   const payslip_month = req.param('payslip_month');

   
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      const array_listcustomer = [];

      const sql = `
         select 
         *,(SELECT IFNULL(sum(payslip_total),0) from tb_payslip where payslip_year = '${payslip_year}' and payslip_month = '${payslip_month}' and payslip_citizent = A.customers_citizent and payslip_expenditure = '0') as payslip_revenue
         ,(SELECT IFNULL(sum(payslip_total),0) from tb_payslip where payslip_year = '${payslip_year}' and payslip_month = '${payslip_month}' and payslip_citizent = A.customers_citizent and payslip_revenue = '0') as payslip_expenditure
         ,IFNULL((SELECT history_salary_salary FROM (select  history_salary_salary,CONVERT(history_salary_year, UNSIGNED INTEGER) as  history_salary_year ,CONVERT(history_salary_month, UNSIGNED INTEGER) as history_salary_month from tb_history_salary where customers_citizent = A.customers_citizent ) As B order by B.history_salary_year DESC, B.history_salary_month DESC LIMIT 0,1),0) as Salary
         from 
         (SELECT * from tb_customers left join tb_customer_type on tb_customers.customers_type = tb_customer_type.customer_type_id left join tb_customer_status on tb_customers.customers_status = tb_customer_status.customer_status_id left join tb_bank on tb_customers.customers_bank = tb_bank.bank_id ) As A
      `
      connection.query(sql, function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;  
      });
   });
})

route.get('/customer_manage_page', (req,res,next)=>{
  
   
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      const array_listcustomer = [];

      const sql = `
      
         SELECT * from tb_customers left join tb_customer_type on tb_customers.customers_type = tb_customer_type.customer_type_id left join tb_customer_status on tb_customers.customers_status = tb_customer_status.customer_status_id left join tb_bank on tb_customers.customers_bank = tb_bank.bank_id 
      `
      connection.query(sql, function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;  
      });
   });
})

route.get('/account_type', (req,res,next)=>{
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query('SELECT * from tb_account_type', function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;  
      });
   });
})

route.post('/get_list_expenditure', (req,res,next)=>{
   const customers_type = req.body.customers_type;
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(`SELECT * from tb_expenditure left join tb_customer_type on tb_expenditure.customer_type_id = tb_customer_type.customer_type_id where tb_expenditure.customer_type_id = '${customers_type}'  `, function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;  
      });
   });
})

route.post('/get_list_revenue', (req,res,next)=>{
   const customers_type = req.body.customers_type;
   pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(`SELECT * from tb_revenue left join tb_customer_type on tb_revenue.customer_type_id = tb_customer_type.customer_type_id where tb_revenue.customer_type_id = '${customers_type}'`, function (error, results, fields) {
         res.json(results);
         connection.release();
         if (error) throw error;  
      }); 
   });
})

module.exports = route;
