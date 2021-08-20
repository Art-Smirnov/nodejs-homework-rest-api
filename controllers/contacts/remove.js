const Contacts = require("../../model");
const HttpCode = require("../../helpers/codes-constants");

const remove = async (req, res, next) => {
  const contact = await Contacts.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  return res.status(HttpCode.NOT_FOUND).json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

module.exports = remove;
