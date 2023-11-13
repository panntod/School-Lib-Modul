// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const { uploadMember } = require("./upload-foto")
const memberModel = require("../models/index").member;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

//mengeksport variabel supaya bisa digunakan di file lain
exports.getAllMember = async (req, res) => {
  // menunggu proses mengambil semua data
  let members = await memberModel.findAll();
  //mengirim data
  return res.json({
    succes: true,
    data: members,
    message: "All Member have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.findMember = async function (req, res) {
  // mengambil variabel keyword dari inputan 
  let keyword = req.body.keyword;
  // menunggu proses mencari data sesuai dengan keyword
  let members = await memberModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: keyword } },
        { gender: { [Op.substring]: keyword } },
        { address: { [Op.substring]: keyword } },
      ],
    },
  });
  // mengirim data
  return res.json({
    succes: true,
    data: members,
    message: "All Members have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.addMember = async (req, res) => {
  // menggunakan function uploadMember
  uploadMember.single("foto")(req, res, async (error) => {
    // jika terjadi eror
    if (error) return res.json({ message: error });
    //jika tidak ada file yang di uploadMember
    if (!req.file) return res.json({ message: "nothing to uploadMember" });
    //menyiapkan data
    let newMember = {
      name: req.body.name,
      address: req.body.addres,
      gender: req.body.gender,
      contact: req.body.contact,
      foto: req.file.filename,
    };
    //memproses buatkan data
    memberModel.create(newMember)
    //jika berhasil maka buka dengan then
      .then((fields) => {
        return res.json({
          succes: true,
          data: fields,
          message: "New Member has been added",
        });
      })
      //jika gagal maka buka dengan catch
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.updateMember = async (req, res) => {
  //menggunakan function uploadMember
  uploadMember.single("foto")(req, res, async (error) => {
    //jika terjadi error
    if (error) return res.json({ message: error });
    //mengambil id menggunakan params
    let idMember = req.params.id;
    //menyiapkan data user
    let dataMember = {
      name: req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      contact: req.body.contact,
    };
    // jika ada file foto bary
    if (req.file) {
      // mengambil data member yang terpilih sesuai id
      const selectedMember = await memberModel.findOne({ where: { id: idMember }});
      // mengambil foto lama dan disimpan divariabek
      const oldFoto = selectedMember.foto;
      // menyesuaikan nama sesuai dengan path nya
      const pathFotoMurid = path.join(__dirname,`../foto-member`,oldFoto)
      // jika ada data yang muncul maka akan dihapus
      if (fs.existsSync(pathFotoMurid)) {
        fs.unlinkSync(pathFotoMurid, (err) => console.log(idMember, err) );
      }

      // menambahkan foto sesuai dengan inputan
      dataMember.foto = req.file.filename;
    }

    // menjalankan proses update
    memberModel.update(dataMember, { where: { id: idMember } })
    // jika berhasil buka promise dengan then
      .then((field) => {
        return res.json({
          succes: true,
          data: field,
          message: "Data member has been update",
        });
      })
      // jika gagal buka promise dengan catch
      .catch((err) => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.deleteMember = async (req, res) => {
  //mengambil id menggunakan params
  const idMember = req.params.id;
  // menunggu proses mencari member menggunakan id
  const member = await memberModel.findOne({ where: { id: idMember } });
  // menyimpan foto lama di variabel
  const oldFoto = member.foto;
  // memberikan nama sesuai dengan path folder nya
  const pathFotoMurid = path.join(__dirname,`../foto-murid`,oldFoto.toString());
  // jika foto ditemukan maka akan dihapus
  if (fs.existsSync(pathFotoMurid)) {
    fs.unlink(pathFotoMurid, (error) => console.log(error));
  }
  //mengapus data member sesuai dengan id
  memberModel.destroy({ where: { id: idMember } })
  // jika berhasil maka buka promise dengan then
    .then((fields) => {
      return res.json({
        succes: true,
        data: fields,
        message: "Data Member has been deleted",
      });
    })
    // jika gagal buka promise dengan catch
    .catch((err) => {
      return res.json({
        succes: false,
        message: err.message,
      });
    });
};
