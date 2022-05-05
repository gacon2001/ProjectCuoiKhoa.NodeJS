'use strict';
const express = require('express');
const {LayThongTinHeThongRap} = require('../../../models');

const quanLiRapRouter = express.Router();

// router.get('/hinhanh/:id', async (req, res) => {
// res.sendFile();
// });
// src = 
quanLiRapRouter.get("/LayThongTinHeThongRap", async (req, res)=>{
    const layThongTinHeThongRap = await LayThongTinHeThongRap.findAll(); // lấy tất cả các cột - cột logo
    // thêm vào 1 thuộc tính logo: đường dẫn tới endpoint lấy hình
    if(!layThongTinHeThongRap){
        res.status(500).send("can not get list HeThongRap");
    }
    res.status(200).send(layThongTinHeThongRap)
});

module.exports = quanLiRapRouter;