const express = require("express");
const { validation } = require("../../middlewares");
const { authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user/user");
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/register',
	validation(schemas.registerSchema),
	ctrlWrapper(ctrl.register));

router.post("/login",
	validation(schemas.loginSchema),
	ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/:id/subscription",
	authenticate,
	validation(schemas.updateSubscription),
	ctrlWrapper(ctrl.updateSubscribeStatus));


module.exports = router;