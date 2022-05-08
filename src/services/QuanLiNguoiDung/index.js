"use strict";
const { LayDanhSachLoaiNguoiDung } = require("../../../models");
const { LayDanhSachNguoiDung } = require("../../../models");

const getAllDSLoaiNguoiDung = async () => {
  try {
    const layDSLoaiNguoiDung = await LayDanhSachLoaiNguoiDung.findAll();
    return layDSLoaiNguoiDung;
  } catch (error) {
    return null;
  }
};

const getAllDSNguoiDung = async () => {
  try {
    const layDSNguoiDung = await LayDanhSachNguoiDung.findAll();
    return layDSNguoiDung;
  } catch (error) {
    return null;
  }
};

const createUser =  async(user)=>{
    try {
        const newUser = await LayDanhSachNguoiDung.create(user);
        return newUser;
    } catch (error) {
        return null;
    }
}

const getUserByTaiKhoan = async (taiKhoan) => {
  try {
    const user = await LayDanhSachNguoiDung.findOne({
      where: {
        taiKhoan,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

const updateUserByTaiKhoan = async (taiKhoan, data) => {
  try {
    //update nhận 2 param: tham số 1: data object {}, tham số 2: điều kiện condition để thực thi cái update
    const userUpdate = await LayDanhSachNguoiDung.update(data, {
      where: {
        taiKhoan,
      },
    });
    return userUpdate;
  } catch (error) {
    return null;
  }
};

const checkExistUserByTaiKhoan = async (taiKhoan) => {
  try {
    const user = await LayDanhSachNguoiDung.findOne({
      where: {
        taiKhoan,
      },
    });
    if (!user) {
      //ko có user -> false
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
const deleteNguoiDungByTaiKhoan = async (taiKhoan) => {
  try {
    const user = await LayDanhSachNguoiDung.destroy({
      where: {
        taiKhoan,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAllDSLoaiNguoiDung,
  getAllDSNguoiDung,
  checkExistUserByTaiKhoan,
  deleteNguoiDungByTaiKhoan,
  getUserByTaiKhoan,
  updateUserByTaiKhoan,
  createUser,
};
