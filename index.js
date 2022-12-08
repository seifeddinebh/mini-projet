const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')




const bodyParser = require('body-parser')
const passport = require('passport')
require('./database/connect')
require('./passport-strategies/bearer')

app.use(cors())
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('express-session')({ secret: 'shhhhh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/api' , require('./Rootes/user'))
app.use('/api' , require('./Rootes/mission'))
app.use('/api' , require('./Rootes/Auth'))

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(5000 , function(){
    console.log('serving on starter')
})