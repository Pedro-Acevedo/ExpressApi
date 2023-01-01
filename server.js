require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const booksRoutes = require('./routes/books')

mongoose.set("strictQuery", false);
mongoose.connect( process.env.DATABASE_URL, { 
    useNewUrlParser: true
    }, 
)

const db = mongoose.connection

db.on('error', (err) => console.log( err ))
db.once('open', () => console.log('Connected to mongo!'))

app.use(express.json())

app.use('/books', booksRoutes)

app.listen(2323, () => console.log('Server Stared!')) 