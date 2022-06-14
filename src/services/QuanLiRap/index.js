//tách hàm từ routers =>services: quản lí tập trung hơn
"use strict";
const { LayThongTinHeThongRap } = require("../../../models");
const { LayDanhSachPhim } = require("../../../models");
const { DanhSachCumRap } = require("../../../models");
const { DanhSachRap } = require("../../../models");

const getAllThongTinHeThongRap = async () => {
  try {
    const layThongTinHeThongRap = await LayThongTinHeThongRap.findAll();
    return layThongTinHeThongRap;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getDSCumRap = async () => {
    try {
        const layDSRap = await DanhSachRap.findAll();
        return layDSRap;
    } catch (error) {
        return null;
    }
};

const getDSRap = async () => {
    try {
        const layDSCumRap = await DanhSachCumRap.findAll();
        return layDSCumRap;
    } catch (error) {
        return null;
    }
}

const getInforCumRapTheoHeThong = async (maHeThongRap) => {
  try {
    const cumRap = await DanhSachCumRap.findOne({
      where: {
        maHeThongRap,
      },
      include: [
        {
          model: 
        }
      ]
    });
    return cumRap;
  } catch (error) {
    return null;
  }
};

// const getInforLichChieuPhimByMaPhim = async(maPhim) =>{
//     try {
//         const movie = await LayDanhSachPhim.findOne({
//             where:{
//                 maPhim,
//             }
//         })
//         return movie;
//     } catch (error) {
//         return null;
//     }
// }

module.exports = {
  getAllThongTinHeThongRap,
  // getInforLichChieuPhimByMaPhim,
  getInforCumRapTheoHeThong,
  getDSCumRap,
  getDSRap,
};
