//load operation from member table
const memberModel = require("../models/index").member

//load operation from sequelize
const Op = require("sequelize").Op

//load upload method
const upload = require('./upload-foto').single('foto')

//load path
const path = require('path')

//load fs
const fs = require('fs')

//create function for read all data
exports.getAllMember = async (req, res) => {
  //get all data
  let members = await memberModel.findAll();
  return res.json({
    succes: true,
    data: members,
    message: "All Member have been loaded",
  });
};

//create function for filter data
exports.findMember = async function (req, res) {
  //define keyword to find data
  let keyword = req.body.keyword;

  //get data with keyword
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

//create for input to members
exports.addMember = async (req, res) => {
  upload(req, res, async error => {
    if(error){
      return res.json({message: error})
    }
    if(!req.file){
      return res.json({message:"nothing to upload"})
    }

    //prepare data
    let newMember = {
      name: req.body.name,
      address: req.body.addres,
      gender: req.body.gender,
      contact: req.body.contact,
      foto: req.file.filename
    };
  
    memberModel.create(newMember)
      //if = then, else = cath
      .then(fields => {
        //if succes
        return res.json({
          succes: true,
          data: fields,
          message: "New Member has been added",
        });
      })
      .catch(error =>{
        return res.json({
            success:false,
            message:error.message
        })
    })
  })
  
};

//create to update data
exports.updateMember = async (req, res) => {
  upload(req, res, async error => {
    if(error) {
      return res.json({message:error})
    }
    let idMember = request.params.id;
    let dataMember = {
      name: req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      contact: req.body.contact,
      foto: req.file.filename
  };
    if(!req.file){
      const selectedMember = await memberModel.findOne({ where: {id : idMember} })
      const oldFoto = selectedMember.foto
      const pathFotoMurid = path.join(__dirname,`../foto-murid`,oldFoto)
      if (fs.existsSync (pathFotoMurid)){
        fs.unlink(pathFotoMurid, err => {
          console.log(idMember, err)
        })
      }

      murid.foto = request.file.filename
    }
    //execute update data
    memberModel.update(dataMember, { where: { id: idMember } })
      .then((field) => {
        //if succes
        return res.json({
          succes: true,
          message: "Data member has been update",
        });
      })
      .cath((err) => {
        return res.json({
          succes: false,
          message: err.message,
        });
      });
  })
};

//create function delete data
exports.deleteMember = async (req, res) => {
  const idMember = req.params.id;
  const member = await memberModel.findOne({ where: {id:idMember}})
  const oldFoto = member.foto
  const pathFotoMurid = path.join(__dirname,`../foto-murid`,oldFoto.toString())
  if(fs.existsSync (pathFotoMurid)){
    fs.unlink(pathFotoMurid,error=>console.log(error))
  }
  //execute data
  memberModel
    .destroy({ where: { id: idMember } })
    .then((fields) => {
      return res.json({
        succes: true,
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
