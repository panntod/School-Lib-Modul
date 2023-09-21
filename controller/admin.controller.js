const adminModel = require("../models/index").admin;
const Op = require("sequelize").Op;
const upload = require("./upload-foto-admin").single("foto");
const path = require("path");
const fs = require("fs");

exports.getAllAdmin = async (req, res) => {
  let admins = await adminModel.findAll();
  return res.json({
    succes: true,
    data: admins,
    message: "All admins have been loaded",
  });
};

exports.findAllAdmin = async (req, res) => {
  let keyword = req.body.keyword;

  const admins = await adminModel.findAll({
    [Op.or]: [{ name: { [Op.substring]: keyword } }],
  });

  return res.json({
    succes: true,
    data: admins,
    message: "all admins have been loaded",
  });
};

exports.addAdmin = async (req, res) => {
  upload(req, res, async err => {
    if (err) {
      return res.json({ message: err });
    }
    if (!req.file) {
      return res.json({ message: "nothing to upload" });
    }
    let newAdmin = {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
      foto: req.file.filename
    };

    adminModel
      .create(newAdmin)
      .then(result => {
        return res.json({
          succes: true,
          data: result,
          message: "New Admin has been added",
        });
      })
      .catch(error => {
        return res.json({
          succes: false,
          message: error.message,
        });
      });
  });
};

exports.updateAdmin = async (req, res) => {
  upload(req, res, async error => {
    if (error) {
      return res.json({ message: error });
    }
    const id = req.params.id;
    const dataAdmin = {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
      foto: req.file.filename
    };
    if (!req.file) {
      const selectedAdmin = await adminModel.findOne({
        where: { id: id },
      });
      const oldFoto = selectedAdmin.foto;
      const pathFotoAdmin = path.join(
        __dirname,
        `../foto-admin`,
        oldFoto.toString()
      );
      if (fs.existsSync(pathFotoAdmin)) {
        fs.unlink(pathFotoAdmin, err => {
          console.log(id, err);
        });
      }
      admin.foto = req.file.filename
    }
    adminModel
      .update(dataAdmin, { where: { id: id } })
      .then(field => {
        //if succes
        return res.json({
          succes: true,
          message: "Data admin has been update",
        });
      })
      .cath(err => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  });
};

exports.deleteAdmin = async (req, res) => {
    const id = req.params.id;
    const admin = await adminModel.findOne({ where: {id:id}})
    const oldFoto = admin.foto
    const pathFotoAdmin = path.join(__dirname,`../foto-admin`,oldFoto.toString())
    if(fs.existsSync (pathFotoAdmin)){
      fs.unlink(pathFotoAdmin,error=>console.log(error))
    }
    //execute data
    adminModel
      .destroy({ where: { id: id } })
      .then(fields => {
        return res.json({
          succes: true,
          message: "Data admin has been deleted",
        });
      })
      .catch(err => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  };