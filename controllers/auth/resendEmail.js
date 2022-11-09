const { User } = require("../../models/user/user");
const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw RequestError(400, "missing required field email")
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw RequestError(404)
	}
	if (user.verify) {
		throw RequestError(400, "Verification has already been passed")
	}

	const mail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href ="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify</a>`,
	}
	await sendEmail(mail);

	res.json({
		message: "Email send seccess"
	})
}

module.exports = resendEmail;