const Joi = require("joi");

const HttpCode = require("../../helpers/codes-constants");

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ca", "uk", "org"] } })
    .required(),

  phone: Joi.string()
    .trim()
    .regex(/^(?=.*[0-9])[- +()0-9]+$/)
    .min(10)
    .max(15)
    .required(),

  isBlocked: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ca", "uk", "org"] } })
    .optional(),

  phone: Joi.string()
    .trim()
    .regex(/^(?=.*[0-9])[- +()0-9]+$/)
    .min(10)
    .max(15)
    .required(),

  isBlocked: Joi.boolean().optional(),
}).or("name", "email", "phone", "isBlocked");

const schemaUpdateContactStatus = Joi.object({
  isBlocked: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: err.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(schemaAddContact, req.body, next);
  },
  updateContactValidation: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  updateContactStatusValidation: (req, res, next) => {
    return validate(schemaUpdateContactStatus, req.body, next);
  },
};
