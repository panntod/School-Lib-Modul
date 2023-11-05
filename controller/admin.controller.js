// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const upload = require("./upload-foto-admin").single("foto");
const adminModel = require("../models/index").admin;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

//mengeksport variabel supaya bisa digunakan di file lain
exports.getAllAdmin = async (req, res) => {
  // menyiapkan data admin
  let admins = await adminModel.findAll();
  // mengirim data yang sudah disiapkan 
  return res.json({
    succes: true,
    data: admins,
    message: "All admins have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.findAllAdmin = async (req, res) => {
  // mengambil kata kunci dari keyword
  let keyword = req.body.keyword;

  // mengambil data admin sesuai dengan kata kunci
  const admins = await adminModel.findAll({
    [Op.or]: [{ name: { [Op.substring]: keyword } }],
  });

  // mengirim data
  return res.json({
    succes: true,
    data: admins,
    message: "all admins have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.addAdmin = async (req, res) => {
  // mengupload data admin
  upload(req, res, async (err) => {
    // jika terjadi eror
    if (err) return res.json({ message: err });
    // jika tidak ada file yang diapload
    if (!req.file) return res.json({ message: "nothing to upload" });
    
    // menyiapkan data
    let newAdmin = {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
      foto: req.file.filename,
    };

    // menjalankan proses upload sesuai dengan data
    adminModel.create(newAdmin)
    // jika berhasil maka buka promise dengan then
      .then((result) => {
        return res.json({
          succes: true,
          data: result,
          message: "New Admin has been added",
        });
      })
    //jika gagal maka buka promise dengan catch
      .catch((error) => {
        return res.json({
          succes: false,
          message: error.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.updateAdmin = async (req, res) => {
  // menjalankan proses upload
  upload(req, res, async (error) => {
    //jika terjadi error
    if (error) return res.json({ message: error });
    //mengambil id admin dengan params
    const idAdmin = req.params.id;
    // menyiapkan data admin
    const dataAdmin = {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
      foto: req.file.filename,
    };
    //jika ada file yang dipilih
    if (req.file) {
      //menyiapkan data admin untuk tempat menaruh foto 
      const selectedAdmin = await adminModel.findOne({
        where: { id: idAdmin },
      });
      // menyiapkan data foto
      const oldFoto = selectedAdmin.foto;
      // membuat nama baru untuk file yang disimpan sesuai dengan folder
      const pathFotoAdmin = path.join(__dirname,`../foto-admin`,oldFoto);
      // jika sudah ada foto lama maka akan dihapus
      if (fs.existsSync(pathFotoAdmin)) {
        fs.unlink(pathFotoAdmin, (err) => {
          console.log(idAdmin, err);
        });
      }
      // mengupload foto baru
      dataAdmin.foto = req.file.filename;
    }
    // menjalankan proses update
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
    // jika berhasil maka buka promise dengan then
      .then((field) => {
        return res.json({
          succes: true,
          data: field,
          message: "Data admin has been update",
        });
      })
    //jika gagal maka buka promise dengan catch
      .catch((err) => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.deleteAdmin = async (req, res) => {
  // mengambil id dari params
  const idAdmin = req.params.id;
  // mencari data sesuai dengan params id
  const admin = await adminModel.findOne({ where: { id: idAdmin } });
  //mengambil foto disimpan divariabel foto lama
  const oldFoto = admin.foto;
  // menamakan foto sesuai dengan foldernya
  const pathFotoAdmin = path.join(__dirname,`../foto-admin`, oldFoto);
  // jika foto ada maka akan di hapus
  if (fs.existsSync(pathFotoAdmin)) {
    fs.unlinkSync(pathFotoAdmin, (error) => console.log(error));
  }
  // menghapus data admin sesuai dengan id
  adminModel.destroy({ where: { id: idAdmin } })
  // jika berhasil maka buka promise dengan then
    .then((fields) => {
      return res.json({
        succes: true,
        data: fields,
        message: "Data admin has been deleted",
      });
    })
  // jika gagal maka akan buka promise menggunakan catch
    .catch((err) => {
      return res.json({
        succes: false,
        message: err.message,
      });
    });
};
