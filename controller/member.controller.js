 //load operation from member table
const memberModel = require('../models/index')

 //load operation from sequelize
 const Op = require('sequelize').Op

 //create function for read all data
 exports.getAllMember = async (req, res) => {
    //get all data
    let members = await memberModel.findAll()
    return res.json({
        succes: true,
        data: members,
        message: 'All Member have been loaded'
    })
 }

 //create function for filter data
 exports.findMember = async function(req, res) {
    //define keyword to find data
    let keyword = req.body.keyword

    //get data with keyword
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                {name: {[Op.substring]: keyword}},
                {gender: {[Op.substring]: keyword}},
                { address: {[Op.substring]: keyword}}
            ]
        }
    })

    return res.json({
        succes: true,
        data: members,
        message: 'All Members have been loaded'
    })
 } 

 //create for input to members
 exports.addMember = (req,res) => {
    //prepare data 
    let newMember = {
        name: req.body.name,
        address: req.body.addres,
        gender: req.body.gender,
        contact: req.body.contact
    }

    memberModel.create(newMember)
    //if = then, else = cath 
    .then(fields => {
        //if succes
        return res.json({
            succes: true,
            data: fields,
            message: 'New Member has been added'
        })
    }).cath(error => {
        //if error
        return res.json({
            succes: false,
            message: error.message
        })
    })
 }

 //create to update data
 exports.updateMember = (req, res) => {
    //prepare data
    let dataMember = {
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        contact: req.body.contact
    }

    //define id 
    let idMember = request.params.id

    //execute update data
    memberModel.update(dataMember, {where: { id: idMember }})
    .then(field => {
        //if succes
        return res.json({
            succes: true,
            message: 'Data member has been update'
        })
    })
    .cath(err => {
        return res.json({
            succes: false,
            message: err.message
        })
    })
 }

 //create function delete data
 exports.deleteMember = (req, res) => {
    //define id
    let idMember = req.params.id
    
    //execute data
    memberModel.destroy({ where: { id: idMember } })
    .then(fields => {
        return res.json({
            succes: true,
            message: 'Data Member has been update'
        })
    })
    .catch(err => {
        return res.json({
            succes: false,
            message: err.message
        })
    })
 }