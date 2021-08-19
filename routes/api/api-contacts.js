const express = require("express");
const router = express.Router();
const HttpCode = require("../../helpers/codes-constants");
const { addContactValidation, updateContactValidation, updateContactStatusValidation } = require("./validation");

const Contacts = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await Contacts.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(HttpCode.ADDED).json({ status: "success", code: HttpCode.ADDED, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await Contacts.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

router.put("/:contactId", updateContactValidation, async (req, res, next) => {
  const contact = await Contacts.updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

router.patch("/:contactId/blocked", updateContactStatusValidation, async (req, res, next) => {
  const contact = await Contacts.updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

module.exports = router;
