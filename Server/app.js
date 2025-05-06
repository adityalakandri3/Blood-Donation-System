const express = require ('express');
const app = express();
const path = require('path');
const fs = require('fs')
const ejs = require('ejs')
const cors = require('cors');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const flash = require('connect-flash')
//database connection
const dbConnect = require('./app/config/db')
dotenv.config();
dbConnect()

//setting up cors
app.use(cors());


//sessions and cookies
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))

  app.use(flash());
  app.use(cookieParser());

//setting up template engine
app.set('view engine','ejs')
app.set('views','views')


//setup body parser
app.use(express.json({
    limit:'50mb',
    extended:true
}));
app.use(express.urlencoded({extended:true}))

//static folder
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')));



//Routes
const UserRoute = require('./app/router/UsersRouter')
app.use(UserRoute);

const BloodRequestRoute=require('./app/router/BloodRequestRouter');
app.use(BloodRequestRoute);

const CampRoute = require('./app/router/CampRouter');
app.use(CampRoute)

const RegistrationRoute = require('./app/router/RegistrationRouter');
app.use(RegistrationRoute);

const DonorRoute = require('./app/router/DonorRouter');
app.use(DonorRoute);

const AdminRoute = require('./app/router/AdminRouter');
app.use(AdminRoute);

//listening port
const port = 3006;
app.listen(port,()=>{
    console.log(`Server is running at port: ${port}`)
})