const Joi = require("joi");

const validateMember = (req, res, next) => {
  const rules = Joi.object()
    .keys({
      name: Joi.string().required(),
      address: Joi.string().required(),
      contact: Joi.number().required(),
      gender: Joi.string().valid("laki laki", "perempuan"),
    })
    .options({
      abortEarly: false,
    });
  let { error } = rules.validate(req.body);

  if (error != null) {
    let errMessage = error.details.map((it) => it.message).join(" ,");

    return res.status(422).json({
      success: false,
      message: errMessage,
    });
  }

  next();
};

const validateAdmin = (req, res, next) => {
  const rules = Joi.object()
    .keys({
      name: Joi.string().required(),
      address: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      contact: Joi.number().required(),
    })
    .options({
      abortEarly: false,
    });
  let { error } = rules.validate(req.body);

  if (error != null) {
    let errMessage = error.details.map((it) => it.message).join(" ,");

    return res.status(422).json({
      success: false,
      message: errMessage,
    });
  }

  next();
};

const validateBook = (req, res, next) => {
  const rules = Joi.object()
    .keys({
      isbn: Joi.number().required(),
      title: Joi.string().required(),
      author: Joi.string().required(),
      publisher: Joi.string().required(),
      category: Joi.string().required(),
      stock: Joi.number().required(),
    })
    .options({
      abortEarly: false,
    });
  let { error } = rules.validate(req.body);

  if (error != null) {
    let errMessage = error.details.map((it) => it.message).join(" ,");

    return res.status(422).json({
      success: false,
      message: errMessage,
    });
  }

  next();
};

module.exports = { validateMember, validateAdmin, validateBook };
