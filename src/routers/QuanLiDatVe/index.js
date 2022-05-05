'use strict';
const express = require('express');

// app.use(express.json());//parse data qua json

const quanLiDatVeRouter = express.Router();

quanLiDatVeRouter.post("/DatVe", (req, res)=>{
    const {maLichChieu, danhSachVe} = req.body;//destructuring

    res.send("ok")
})

quanLiDatVeRouter.get('/LayDanhSachPhongVe/maLichChieu', (req, res)=>{
    const maLichChieu = {
        maLichChieu: Date.now(),
    };
    arrListTicketRoom.push(maLichChieu);
    res.status(200).send(arrListTicketRoom);
});

module.exports = quanLiDatVeRouter;