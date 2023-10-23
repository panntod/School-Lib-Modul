const upload = require("./upload-foto-member").single("foto");
const memberModel = require("../models/index").member;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

exports.getAllMember = async (req, res) => {
  let members = await memberModel.findAll();
  return res.json({
    succes: true,
    data: members,
    message: "All Member have been loaded",
  });
};

exports.findMember = async function (req, res) {
  let keyword = req.body.keyword;
  let members = await memberModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: keyword } },
        { gender: { [Op.substring]: keyword } },
        { address: { [Op.substring]: keyword } },
      ],
    },
  });
  return res.json({
    succes: true,
    data: members,
    message: "All Members have been loaded",
  });
};

exports.addMember = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }
    if (!req.file) {
      return res.json({ message: "nothing to upload" });
    }
    let newMember = {
      name: req.body.name,
      address: req.body.addres,
      gender: req.body.gender,
      contact: req.body.contact,
      foto: req.file.filename,
    };
    memberModel
      .create(newMember)
      .then((fields) => {
        return res.json({
          succes: true,
          data: fields,
          message: "New Member has been added",
        });
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};
exports.updateMember = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }
    let idMember = req.params.id;
    let dataMember = {
      name: req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      contact: req.body.contact,
    };
    if (req.file) {
      const selectedMember = await memberModel.findOne({
        where: { id: idMember },
      });
      const oldFoto = selectedMember.foto;
      const pathFotoMurid = path.join(__dirname,`../foto-member`,oldFoto)
      if (fs.existsSync(pathFotoMurid)) {
        fs.unlinkSync(pathFotoMurid, (err) => {
          console.log(idMember, err);
        });
      }
      dataMember.foto = req.file.filename;
    }
    memberModel
      .update(dataMember, { where: { id: idMember } })
      .then((field) => {
        return res.json({
          succes: true,
          data: field,
          message: "Data member has been update",
        });
      })
      .catch((err) => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  });
};
exports.deleteMember = async (req, res) => {
  const idMember = req.params.id;
  const member = await memberModel.findOne({ where: { id: idMember } });
  const oldFoto = member.foto;
  const pathFotoMurid = path.join(
    __dirname,
    `../foto-murid`,
    oldFoto.toString()
  );
  if (fs.existsSync(pathFotoMurid)) {
    fs.unlink(pathFotoMurid, (error) => console.log(error));
  }
  memberModel
    .destroy({ where: { id: idMember } })
    .then((fields) => {
      return res.json({
        succes: true,
        data: fields,
        message: "Data Member has been deleted",
      });
    })
    .catch((err) => {
      return res.json({
        succes: false,
        message: err.message,
      });
    });
};
