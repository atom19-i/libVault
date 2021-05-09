if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')


app.set('view engine','ejs') //setting view engine
app.set('views', __dirname + '/views') // setting for views from views folder
app.set('layout','layouts/layout') // setting for layout from layout folder
app.use(expressLayouts) 
app.use(express.static('public')) // all static html files to be stored in public

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser:true,
    useUnifiedTopology : true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)// server generally provides the port. for development reasons,we will use 3000 port