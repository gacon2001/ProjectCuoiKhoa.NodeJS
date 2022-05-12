"use strict";
const { Op } = require("sequelize");
const { LayDanhSachLoaiNguoiDung } = require("../../../models");
const { LayDanhSachNguoiDung } = require("../../../models");
const { Avatar } = require("../../../models");

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

const createUser = async (user) => {
  try {
    const newUser = await LayDanhSachNguoiDung.create(user);
    return newUser;
  } catch (error) {
    return null;
  }
};

const getUserByTaiKhoan = async (taiKhoan) => {
  try {
    const user = await LayDanhSachNguoiDung.findOne({
      where: {
        taiKhoan,
      },
      //!signin -> join avatar 
      include:{
        model: Avatar,
      } 
    });
    // console.log({user});
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

const storageAvatar = async (userId, url) => {
  try {
    const avatar = await Avatar.create({
      url,
      userId,
      isActive: true,
    });

    await Avatar.update(
      {
        isActive: false,
      },
      {
        //điều kiện
        where: {
          userId,//userId mà đang tạo avatar mới nhưng loại bỏ avatar vừa đc insert vo
          id: {
            [Op.not]: avatar.id,//Op: đk là ko phải avatar id này
          },
        },
      }
    );

    return avatar;
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
  storageAvatar,
};
