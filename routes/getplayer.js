const express = require('express');
var router = express.Router();
const mysql = require('mysql');
const fs = require('fs');

//Pool is used when you don't want multiple requests toward the same DB
const pool =mysql.createPool({
    connectionLimit:10,
    host: '127.0.0.1',
    user:'root',
    password:'Password12345&',
    database:'hockey'
});


const db = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'Password12345&',
    database:'hockey'
});

//Connect
db.connect( (err)=>{
    if(err){
        throw err;
    }
    console.log('mySQL connected');
})

router.get('/postget', (req,res)=>{
    let sql = 'SELECT * from hockey.hockeyplayers'
    let query = db.query(sql, (err,result)=>{
        if(err){
            throw err;
            console.log(result)
        }
        console.log(result)
        res.send('posts fetched')

    } )
})

router.get('/postgetsingle/:id', (req,res)=>{
    const queryString = `SELECT * FROM hockey.hockeyplayers WHERE id = ${req.params.id}`
    let query = db.query(queryString, (err, result)=>{
       
        if(err){
            console.log("Failed to query")
            res.sendStatus(500);
            return
        } 
        /*
        const hockeyPlayers = result.map((row)=>{
            return {'position':row.position,
                'id': row.position,
                'weight':row.weight,
                'height': row.height,
                'imageUrl':row.imageUrl,
                'birthplace': row.birthplace,
                'age': row.age,
                'name':row.name,
                'birthdate':row.birthdate,
                'number': row.number}
        } );
        */
        
        let rows = result[0];
        console.log(rows.imageUrl)
        res.render('playerdata', {
            imgURL: rows.imageUrl,
             number:rows.number, 
             name:rows.name, age:rows.age,
            birthdate:rows.birthdate,
            birthplace:rows.birthplace,
            height:rows.height,
            weight:rows.weight
            /**
             *  <td>{{name}}</td> 
        <td>{{number}}</td>
        <td>{{age}}</td> 
        <td>{{birthdate}}</td>
        <td>{{birthplace}}</td> 
        <td>{{height}}</td>
        <td>{{weight}}</td> 
             * 
             * 
             *  */
        
        })

        console.log(rows)
        
        //res.json(hockeyPlayers);
    })

})

module.exports = router;
