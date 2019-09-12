const express = require('express');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
const morgan = require('morgan');

const  app = express();
const port = process.env.PORT || 3001;

//bring in routes
const authRoute = require('./routes/auth')

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', authRoute);
app.get('/', (req, res)=>{
    res.send("Hello from node")
});
app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})