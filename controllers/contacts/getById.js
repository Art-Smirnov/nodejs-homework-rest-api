const Contacts = require("../../model");
const HttpCode = require("../../helpers/codes-constants");

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
