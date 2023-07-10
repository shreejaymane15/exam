const express =  require('express');
const config = require('config');
const mysql = require('mysql2');

const appForBooks = express.Router();
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
	   });



appForBooks.get("/", (request, response)=>{
    connection.query("select * from Book_Tb", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})


appForBooks.post("/add", (request, response)=>{
    var query = 
    `insert into Book_Tb values(${request.body.id}, '${request.body.b_name}','${request.body.author}','${request.body.book_type}',${request.body.price},${request.body.publishedDate},'${request.body.language}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

appForBooks.post("/update", (request , response)=>{
    var queryForInsert = `update Book_Tb set price ='${request.body.price}',
                                             language ='${request.body.language}'
                                             where id = ${request.body.id}`
    connection.query(queryForInsert,(error , result)=>{
        if(error == null){
            var data = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
            response.end();
        }
        else{
            response.write(error);
            response.end();
        }
    })
})




module.exports = appForBooks;
