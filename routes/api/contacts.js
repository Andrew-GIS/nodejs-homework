const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, validationParams, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, validationParams(schemas.validateId), ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validation(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

router.put(
	"/:contactId",
	authenticate,
	validation(schemas.addSchema),
  	validationParams(schemas.validateId),
  	ctrlWrapper(ctrl.updateContact)
);

router.patch(
	"/:contactId/favorite",
	authenticate,
  validationParams(schemas.validateId),
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
