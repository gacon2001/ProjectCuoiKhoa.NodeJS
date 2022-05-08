"use strict";
const bcrypt = require('bcryptjs')

const scriptMatKhau = (matKhau) => {
    const salt = bcrypt.genSaltSync(10);//muối loại 10 -> db bị hack típ chỉ cần tăng cái muối lên là tăng thêm độ khó
    const hashed = bcrypt.hashSync(matKhau, salt);
    return hashed;
} 

module.exports={
    scriptMatKhau, 
}