const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../controllers");
const { addContactValidation, updateContactValidation } = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", addContactValidation, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", updateContactValidation, ctrl.update);

module.exports = router;
