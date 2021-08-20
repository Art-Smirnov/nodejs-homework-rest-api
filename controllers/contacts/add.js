const Contacts = require("../../model");
const HttpCode = require("../../helpers/codes-constants");

const add = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(HttpCode.ADDED).json({ status: "success", code: HttpCode.ADDED, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
