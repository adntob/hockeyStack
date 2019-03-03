const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const hbs = require('express-handlebars');


app.use(bodyParser.urlencoded({extended: false}  ) );

app.use(morgan('combined'));


app.engine('hbs', hbs({extname: 'hbs', defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')



app.get('/', (req,res)=>{
    //res.send("Main page");
    res.render('index', {name:"index" })
})



//Routes

const router = express.Router();

//localhost:3000/postgetsingle/8465166 will give the player of id = *

const getPlayerRouter = require('./routes/getplayer.js')

app.use(getPlayerRouter);


app.listen(3000, ()=>{
    console.log('Server started on port 3000')
});

