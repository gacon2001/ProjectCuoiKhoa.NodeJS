'use strict';
const express = require("express");
const quanLiDatVeRouter = require('./QuanLiDatVe');
const quanLiRapRouter = require('./QuanLiRap');
const quanLiPhimRouter = require("./QuanLiPhim");

const rootRouter = express.Router();//method trả về router (phụ) cho mình 

rootRouter.use("/QuanLiDatVe", quanLiDatVeRouter);//gắn quanLiDatVeRouter là con của rootRouter
rootRouter.use("/QuanLiRap", quanLiRapRouter);
rootRouter.use("/QuanLiPhim", quanLiPhimRouter);

module.exports =  rootRouter;