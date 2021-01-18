const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express()

// db config
const db = require('./config/keys').MongoURI

//connect to db
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Mongo DB Connected'))
    .catch(err => console.log(err))
//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000



app.listen(PORT, console.log(`server started on ${PORT}`))