const md5 = require("md5");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/index").admin;

const authenticate = async (req, res) => {
  try {
    let dataLogin = {
      username: req.body.username,
      password: md5(req.body.password),
    };

    let dataAdmin = await adminModel.findOne({ where: dataLogin });

    if (dataAdmin) {
      let payLoad = JSON.stringify(dataAdmin);
      let secret = "rahasia-sangat-rahasia";
      let token = jwt.sign(payLoad, secret);

      return res.json({
        success: true,
        logged: true,
        message: "Authentication Succeeded",
        token: token,
        data: dataAdmin,
      });
    } else {
      return res.json({
        success: false,
        logged: false,
        message: "Authentication Failed, Invalid Username or Password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      logged: false,
      message: "Authentication Error",
    });
  }
};

const authorize = (req, res, next) => {
  let headers = req.headers.authorization;

  let tokenKey = headers && headers.split(" ")[1];
  if (tokenKey === null || tokenKey === "") {
    return res.json({
      success: false,
      message: 'Unauthorized User'
    });
  }

  let secret = "rahasia-sangat-rahasia";
  jwt.verify(tokenKey, secret, (err, user) => {
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


module.exports = { authenticate, authorize };
