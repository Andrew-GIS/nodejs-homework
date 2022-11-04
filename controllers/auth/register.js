const { User } = require("../../models/user/user");
const { RequestError } = require('../../helpers');
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
	const { email, password, subscription } = req.body;
	if (typeof email !=="string" || typeof subscription !=="string") {
		throw RequestError(409, "Email and Subscription should be string type");
	}
	const user = await User.findOne({ email });
	if (user) {
		throw RequestError(409, "Email in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const result = await User.create({ email, password: hashPassword, subscription , avatarURL});
	res.status(201).json({
		email: result.email,
		subscription: result.subscription,
	});
};

module.exports = register;