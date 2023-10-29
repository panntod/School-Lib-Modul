const borrowModel = require("../models/index").borrow;
const detailsOfBorrowModel = require("../models/index").details_of_borrow;

const Op = require("sequelize").Op;

exports.addBorrowing = async (req, res) => {
  let newBorrow = {
    memberID: req.body.memberID,
    adminID: req.body.adminID,
    date_of_borrow: req.body.date_of_borrow,
    date_of_return: req.body.date_of_return,
    status: req.body.status,
  };
  borrowModel
    .create(newBorrow)
    .then((result) => {
      let borrowID = result.id;
      let detailsOfBorrow = req.body.details_of_borrow;
      for (let i = 0; i < detailsOfBorrow.length; i++) {
        detailsOfBorrow[i].borrowID = borrowID;
      }

      detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
        .then((result) => {
          return res.json({
            success: true,
            message: "New Book Borrowed Has Been Inserted",
          });
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: err.message,
      });
    });
};

exports.updateBorrowing = async (req, res) => {
  let newBorrow = {
    memberID: req.body.memberID,
    adminID: req.body.adminID,
    date_of_borrow: req.body.date_of_borrow,
    date_of_return: req.body.date_of_return,
    status: req.body.status,
  };
  let borrowID = req.params.id;

  borrowModel
    .update(newBorrow, { where: { id: borrowID } })
    .then(async (result) => {
      await detailsOfBorrowModel.destroy({ where: { borrowID: borrowID } });
      let detailsOfBorrow = req.body.details_of_borrow;
      for (let i = 0; i < detailsOfBorrow.length; i++) {
        detailsOfBorrow[i].borrowID = borrowID;
      }

      detailsOfBorrowModel
        .bulkCreate(detailsOfBorrow)
        .then((result) => {
          return res.json({
            success: true,
            message: "New Book Borrowed Has Been Update",
          });
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: err.message,
          });
        });
    })

    .catch((err) => {
      return res.json({
        succes: false,
        message: err.message,
      });
    });
};

exports.deleteBorrowing = async (req, res) => {
  let borrowID = req.params.id;
  detailsOfBorrowModel
    .destroy({ where: { borrowID: borrowID } })
    .then((result) => {
      return res.json({
        succes: true,
        messsage: "Borrowing book's has deleted",
      });
    })
    .catch((err) => {
      return res.json({
        succes: false,
        messsage: err.message,
      });
    });
};

exports.returnBook = async (req, res) => {
  let borrowID = req.params.id;
  let today = new Date();
  let currentDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  borrowModel
    .update(
      {
        date_of_return: currentDate,
        status: true,
      },
      {
        where: { id: borrowID },
      }
    )
    .then((result) => {
      return res.json({
        succes: true,
        messsage: "Book has been returned",
      });
    })
    .catch((err) => {
      return res.json({
        succes: false,
        messsage: err.message,
      });
    });
};

exports.getBorrow = async (req,res) => {
    let data = await borrowModel.findAll(
        {
            include: [
                `member`, `admin`,
                {
                    model:detailsOfBorrowModel,
                    as: details_of_borrow,
                    include: ["book"]
                }
            ]
        }
    )

    return res.json({
        success: true,
        data: data,
        message: 'All borrowing book have been loaded'
    })
}