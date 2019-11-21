const express = require('express');
const route = express.Router();
const pool = require('../../config/connectMysql');
const verifyToken = require('../../auth/verifyToken');



////////////////////////////////////////////////////////////////////// รายจ่าย
route.post('/insert_list_expenditure', (req, res, next) => {
    const expenditure_name = req.body.expenditure_name;
    const customer_type_id = req.body.customer_type_id;
  
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `INSERT into tb_expenditure(expenditure_name, customer_type_id) `;
        const sql2 = ` values('${expenditure_name}','${customer_type_id}')`;
        connection.query(sql + sql2, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/update_list_expenditure', (req, res, next) => {
    const expenditure_id = req.body.expenditure_id;
    const expenditure_name = req.body.expenditure_name;
    const customer_type_id = req.body.customer_type_id;
  
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `UPDATE tb_expenditure SET  expenditure_name = '${expenditure_name}' ,customer_type_id = '${customer_type_id}' where expenditure_id = '${expenditure_id}' `;
       
        connection.query(sql , function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/delete_list_expenditure', (req, res, next) => {
    const expenditure_id = req.body.expenditure_id;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `DELETE FROM tb_expenditure where expenditure_id = '${expenditure_id}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})


route.post('/get_list_for_add_expenditure', (req, res, next) => {
    const customer_type_id = req.body.customer_type_id;
    const payslip_year = req.body.payslip_year;
    const payslip_month = req.body.payslip_month;
    const payslip_citizent = req.body.payslip_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `
        select 
        *,
        IFNULL(A.payslip_total,0) as payslip_total

        FROM tb_expenditure left join 
        (
            select * from tb_payslip 
            where 
                tb_payslip.payslip_year = '${payslip_year}' and
                tb_payslip.payslip_month = '${payslip_month}' and
                tb_payslip.payslip_citizent = '${payslip_citizent}'
        ) as A 
        on A.payslip_expenditure = tb_expenditure.expenditure_id 
        where 
        tb_expenditure.customer_type_id = '${customer_type_id}'
        order by tb_expenditure.expenditure_id`;
        
       
       
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})

route.post('/get_list_for_add_revenue', (req, res, next) => {
    const customer_type_id = req.body.customer_type_id;
    const payslip_year = req.body.payslip_year;
    const payslip_month = req.body.payslip_month;
    const payslip_citizent = req.body.payslip_citizent;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `
        select 
        *,
        IFNULL(A.payslip_total,0) as payslip_total

        FROM tb_revenue left join 
        (
            select * from tb_payslip 
            where 
                tb_payslip.payslip_year = '${payslip_year}' and
                tb_payslip.payslip_month = '${payslip_month}' and
                tb_payslip.payslip_citizent = '${payslip_citizent}'
        ) as A 
        on A.payslip_revenue = tb_revenue.revenue_id 
        where 
        tb_revenue.customer_type_id = '${customer_type_id}'
        order by tb_revenue.revenue_id`;
        
       
       
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})

////////////////////////////////////////////////////////////////////// รายรับ
route.post('/insert_list_revenue', (req, res, next) => {
    const revenue_name = req.body.revenue_name;
    const customer_type_id = req.body.customer_type_id;
  
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `INSERT into tb_revenue(revenue_name, customer_type_id) `;
        const sql2 = ` values('${revenue_name}','${customer_type_id}')`;
        connection.query(sql + sql2, function (error, results, fields) {
            res.json(results); 
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/update_list_revenue', (req, res, next) => {
    const revenue_id = req.body.revenue_id;
    const revenue_name = req.body.revenue_name;
    const customer_type_id = req.body.customer_type_id;
  
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `UPDATE tb_revenue SET  revenue_name = '${revenue_name}' ,customer_type_id = '${customer_type_id}' where revenue_id = '${revenue_id}' `;
       
        connection.query(sql , function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error;
        });
    });
})

route.post('/delete_list_revenue', (req, res, next) => {
    const revenue_id = req.body.revenue_id;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `DELETE FROM tb_revenue where revenue_id = '${revenue_id}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})


route.post('/get_list_for_add_revenue', (req, res, next) => {
    const customer_type_id = req.body.customer_type_id;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        const sql = `select *  FROM tb_revenue where customer_type_id = '${customer_type_id}'`;
        connection.query(sql, function (error, results, fields) {
            res.json(results);
            connection.release();
            if (error) throw error
        });
    });
})

////////////////////////////////////////////////////////////////////// เพิ่มรายการสลิป
route.post('/insert_list_slip', (req, res, next) => {

     const payslip_citizent = req.body.payslip_citizent;
     const payslip_year = req.body.payslip_year;
     const payslip_month= req.body.payslip_month;
     const list_expenditure_price= req.body.list_expenditure_price; //array
     const payslip_revenue= req.body.payslip_revenue; 
     const values = [];

 

        pool.getConnection(function (err, connection) {
            list_expenditure_price.map((item, index) => {
                const sql = "SELECT * from tb_payslip where payslip_year = ? and payslip_month = ? and payslip_citizent = ? and payslip_expenditure = ? ";
                connection.query(sql, [payslip_year, payslip_month,payslip_citizent,item.expenditure_id], function (error, results, fields) {
                    // if (error) throw error;
                    if(results.length == 1){
                        const sql1 = `update tb_payslip set payslip_total = '${item.expenditure_price}' 
                            where
                                payslip_year = '${payslip_year}' and
                                payslip_month = '${payslip_month}' and 
                                payslip_citizent = '${payslip_citizent}' and 
                                payslip_revenue = '${payslip_revenue}' and
                                payslip_expenditure = '${item.expenditure_id}'
                        `;

                        connection.query(sql1, function (error, results, fields) {
                            //if (error) throw error;
                        });
                    } else {
                        const sql1 = `INSERT into tb_payslip(payslip_year, payslip_month, payslip_citizent, payslip_revenue, payslip_expenditure, payslip_total)`;
                        const sql2 = ` VALUES ('${payslip_year}', '${payslip_month}', '${payslip_citizent}', '${payslip_revenue}', '${item.expenditure_id}', '${item.expenditure_price}')`;

                        connection.query(sql1 + sql2, function (error, results, fields) {
                            //if (error) throw error;
                        });
                        
                    } 
                    
                })
                
            })
            // connection.release();
            res.json(true);
        });
        // if (err) throw err;
            // values.push([
                //     payslip_year, payslip_month, payslip_citizent, payslip_revenue, item.expenditure_id, item.expenditure_price
                // ]);
})

////////////////////////////////////////////////////////////////////// เพิ่มรายการสลิป รายรับ
route.post('/insert_list_slip_revenue', (req, res, next) => {

    const payslip_citizent = req.body.payslip_citizent;
    const payslip_year = req.body.payslip_year;
    const payslip_month= req.body.payslip_month;
    const list_revenue_price= req.body.list_revenue_price; //array
    const payslip_expenditure= req.body.payslip_expenditure; 
    const values = [];
 


       pool.getConnection(function (err, connection) {
           list_revenue_price.map((item, index) => {
               const sql = "SELECT * from tb_payslip where payslip_year = ? and payslip_month = ? and payslip_citizent = ? and payslip_revenue = ? ";
               connection.query(sql, [payslip_year, payslip_month,payslip_citizent,item.revenue_id], function (error, results, fields) {
                   // if (error) throw error;
                   if(results.length == 1){
                       const sql1 = `update tb_payslip set payslip_total = '${item.revenue_price}' 
                           where
                               payslip_year = '${payslip_year}' and
                               payslip_month = '${payslip_month}' and 
                               payslip_citizent = '${payslip_citizent}' and 
                               payslip_expenditure = '${payslip_expenditure}' and
                               payslip_revenue = '${item.revenue_id}'
                       `;

                       connection.query(sql1, function (error, results, fields) {
                           //if (error) throw error;
                       });
                   } else {
                       const sql1 = `INSERT into tb_payslip(payslip_year, payslip_month, payslip_citizent, payslip_expenditure, payslip_revenue, payslip_total)`;
                       const sql2 = ` VALUES ('${payslip_year}', '${payslip_month}', '${payslip_citizent}', '${payslip_expenditure}', '${item.revenue_id}', '${item.revenue_price}')`;

                       connection.query(sql1 + sql2, function (error, results, fields) {
                           //if (error) throw error;
                       });
                       
                   } 
                   
               })
               
           })
           // connection.release();
           res.json(true);
       });
       // if (err) throw err;
           // values.push([
               //     payslip_year, payslip_month, payslip_citizent, payslip_revenue, item.revenue_id, item.revenue_price
               // ]);
})


module.exports = route;