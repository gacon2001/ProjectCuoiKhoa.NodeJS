"use strict";
const express = require("express");
const { authenticate, checkMaLoaiNguoiDung } = require("../../middleware/Auth");
const { scriptMatKhau, comparePassword, genToken } = require("../../services/Auth");
const {
  getAllDSLoaiNguoiDung,
  getAllDSNguoiDung,
  checkExistUserByTaiKhoan,
  deleteNguoiDungByTaiKhoan,
  getUserByTaiKhoan,
  updateUserByTaiKhoan,
  createUser,
} = require("../../services/QuanLiNguoiDung");

const quanLiNguoiDung = express.Router();

quanLiNguoiDung.get("/LayDanhSachLoaiNguoiDung", async (req, res) => {
  const layDSLoaiNguoiDung = await getAllDSLoaiNguoiDung();
  if (!layDSLoaiNguoiDung) {
    res.status(500).send("can not get DS Loai nguoi dung");
  }
  res.status(200).send(layDSLoaiNguoiDung);
});

quanLiNguoiDung.post("/DangNhap", async (req, res) => {
  const {taiKhoan, matKhau} = req.body;
  const user = await getUserByTaiKhoan(taiKhoan);
  if(!user){
      return res.status(400).send(`taiKhoan: ${taiKhoan} is not exist`);
  }
  const isSuccess = comparePassword(matKhau, user.matKhau);
  if(!isSuccess){
    return res.status(400).send(`matKhau is not match`)
  }
  const token = genToken({taiKhoan: user.taiKhoan});
  return res.status.send({user, token})
});

quanLiNguoiDung.post("/DangKi", async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;//ko lấy maLoaiNguoiDung từ body

  //validate

  const matKhauHashed = scriptMatKhau(matKhau);
  console.log({matKhauHashed});//mỗi khi send sẽ log đc chuỗi password khác nhau 

  const data = await createUser({
    taiKhoan,
    //matKhau: matKhauHashed,//! password ko thể dịch ngược lại đc
    matKhau,
    email,
    soDt,
    hoTen,
    maLoaiNguoiDung: "KhachHang",//chỉ khách hàng mới đk
  });
  if(!data){
    return res.status(500).send(`can not create user`)
  }
  res.status(201).send(data);
});

quanLiNguoiDung.get("/LayDanhSachNguoiDung", async (req, res) => {
  const layDSNguoiDung = await getAllDSNguoiDung();
  if (!layDSNguoiDung) {
    res.status(500).send("can not get DS nguoi dung");
  }
  res.status(200).send(layDSNguoiDung);
});

quanLiNguoiDung.get("/TimKiemNguoiDung", async (req, res) => {});

quanLiNguoiDung.post("/LayThongTinNguoiDung/:taiKhoan", async (req, res) => {
  const { taiKhoan } = req.params;

  const user = await getUserByTaiKhoan(taiKhoan);
  if (!user) {
    //ko tồn tại
    return res
      .status(404)
      .send(`user taiKhoan ${taiKhoan} is not existed on database`);
  }
  res.status(200).send(user);
});

quanLiNguoiDung.post("/ThemNguoiDung", async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;

  // const matKhauHashed = scriptMatKhau(matKhau);

  const user = await createUser({
    taiKhoan,
    // matKhau:matKhauHashed,
    matKhau,
    email,
    soDt,
    maLoaiNguoiDung:"QuanTri",
    hoTen,
  });
  if (!user) {
    res.status(500).send("can not create user");
  }
  res.status(201).send(user);
});

//update -> gắn id lên params và body là data mình update nó
quanLiNguoiDung.put("/CapNhatThongTinNguoiDung/:taiKhoan", async (req, res) => {
  const { taiKhoan } = req.params;
  const { matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } = req.body;

  const isExistedUser = await checkExistUserByTaiKhoan(taiKhoan);
  if (!isExistedUser) {
    return res
      .status(404)
      .send(`user taiKhoan ${taiKhoan} is not existed on database`);
  }
  await updateUserByTaiKhoan(taiKhoan, {
    matKhau,
    email,
    soDt,
    maNhom,
    maLoaiNguoiDung,
    hoTen,
  });
  res.status(200).send(`updated`);
});

quanLiNguoiDung.delete("/XoaNguoiDung/:taiKhoan",[authenticate, checkMaLoaiNguoiDung("QuanTri")], async (req, res) => {
  const { taiKhoan } = req.params;

  const isExistedUser = await checkExistUserByTaiKhoan(taiKhoan);
  if (!isExistedUser) {
    return res
      .status(404)
      .send(`user taiKhoan: ${taiKhoan} is not existed on database`);
  }
  //tồn tại thì delete
  const user = await deleteNguoiDungByTaiKhoan(taiKhoan);
  //ktra típ lỡ mất kết nối
  if (!user) {
    res.status(500).send(`can not delete user taiKhoan: ${taiKhoan}`);
  }
  res.status(200).send(`user taiKhoan: ${taiKhoan} is deleted`);
});

module.exports = quanLiNguoiDung;
