'use strict';
const express = require('express');
const {LayDanhSachPhim} = require("../../../models");

const quanLiPhimRouter = express.Router();

quanLiPhimRouter.get("/LayDanhSachPhim", async (req, res)=>{
    const layDanhSachPhim = await LayDanhSachPhim.findAll(); 
    if(!layDanhSachPhim){
        res.status(500).send("can not get list DanhSachPhim");
    }
    res.status(200).send(layDanhSachPhim)
} )