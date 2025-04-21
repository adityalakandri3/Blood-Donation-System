const express = require ('express');
const app = express();
const path = require('path');
const fs = require('fs')
const ejs = require('ejs')



//setting up template engine
app.set('view engine','ejs')
app.set('views','views')

//Routes
const UserRoute = require('./app/router/UserRouter')
app.use(UserRoute);

//listening port
const port = 3006;
app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
})