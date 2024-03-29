if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}

const path = require('path');
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs') //setting view engine
app.set('views', path.join(__dirname , 'views')) // setting for views from views folder
app.set('layout','layouts/layout') // setting for layout from layout folder
app.use(expressLayouts) 
app.use(methodOverride('_method'))
app.use(express.static('public')) // all static html files to be stored in public
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false 
}))
app.use('/.netlify/functions/server', router); 

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser:true,
    useUnifiedTopology : true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.use('/authors',authorRouter) // routes will look like - "/authors/ , /authors/new etc"
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)// server generally provides the port. for development reasons,we will use 3000 port