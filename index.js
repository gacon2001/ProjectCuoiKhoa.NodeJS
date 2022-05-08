'use strict';
const express = require('express');
const {sequelize} = require("./models");//models index export db dòng cuối => sequelize này chính là connect của mình tới database

const rootRouter = require('./src/routers'); 

const app = express();
app.use(express.json());//destructuring -> undefined -> phải dùng express.json

app.use('/api', rootRouter);//tất cả api đều đi qua đường dẫn này mới vào rootRouter => p2: router của mìh (import vô)

//check test connection
sequelize
.authenticate()
.then(()=>{
    console.log("connection has been establised successfully");
})
.catch((err)=>{
    console.error("unable to connect to the database:", err);
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`app litening on port ${port}`);
});