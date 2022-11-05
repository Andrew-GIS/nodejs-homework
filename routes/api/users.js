const express = require("express");
const { validation, authenticate, upload } = require("../../middlewares");
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

router.patch("/subscription",
	authenticate,
	validation(schemas.updateSubscription),
	ctrlWrapper(ctrl.updateSubscribeStatus));

router.patch("/avatars",
	authenticate,
	validation(schemas.avatarSchema),
	upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar));


module.exports = router;