const Contacts = require("../../model");
const HttpCode = require("../../helpers/codes-constants");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
