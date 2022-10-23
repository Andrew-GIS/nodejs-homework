const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, validationParams } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", validationParams(schemas.validateId), ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  	"/:contactId",
	validation(schemas.addSchema),
  	validationParams(schemas.validateId),
  	ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validationParams(schemas.validateId),
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
