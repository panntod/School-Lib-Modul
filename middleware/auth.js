// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/index").admin;
//mengeksport variabel supaya bisa digunakan di file lain
const authenticate = async (req, res) => {
  // mencoba menjalankan proses
  try {
    // menyiapkan data login
    let dataLogin = {
      username: req.body.username,
      // menghash passwor menggunakan md5
      password: md5(req.body.password),
    };
    //menunggu data admin mencari sesuai dara login
    let dataAdmin = await adminModel.findOne({ where: dataLogin });
    //jika data admin ditemukan
    if (dataAdmin) {
      //akan menjadikan token string
      let payLoad = JSON.stringify(dataAdmin);
      //mendeklarasikan kode rahasia
      let secret = "rahasia-sangat-rahasia";
      //mencocokan payload dan kode rahasia
      let token = jwt.sign(payLoad, secret);
      //jika berhasil maka akan dikirim pesan
      return res.json({
        success: true,
        logged: true,
        message: "Authentication Succeeded",
        token: token,
        data: dataAdmin,
      });
      // jika gagal akan dirikim pesan
    } else {
      return res.json({
        success: false,
        logged: false,
        message: "Authentication Failed, Invalid Username or Password",
      });
    }
    // jika terjadi error maka akan dikirim pesan
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      logged: false,
      message: "Authentication Error",
    });
  }
};
//mengeksport variabel supaya bisa digunakan di file lain
const authorize = (req, res, next) => {
  //mendeklarasikan headers untuk tempat menyimpan secret code
  let headers = req.headers.authorization;
  //mengambil data headers(token) dan menghapus spasi yg ada didalamnya
  let tokenKey = headers && headers.split(" ")[1];
  // jika token nya kosong
  if (tokenKey === null || tokenKey === "") {
    return res.json({
      success: false,
      message: 'Unauthorized User'
    });
  }
  //jika token nya ada, deklarasikan kode rahasia sesuai di autenticate
  let secret = "rahasia-sangat-rahasia";
  // akan mencocokan apakah codetoken dan kode rahasia sesuai
  jwt.verify(tokenKey, secret, (err, user) => {
    // jika terjadi perbedaan maka akan dikirim pesan
    if (err) {
      return res.json({
        success: false,
        message: "Invalid Token"
      });
    }
    // Jika tidak ada masalah maka middleware mengizinkan
    next();
  });
};
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = { authenticate, authorize };
