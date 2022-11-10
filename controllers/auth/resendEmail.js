const { User } = require("../../models/user/user");
const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	const mail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href ="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify</a>`,
	}
	await sendEmail(mail);

	res.status(200).json({
		message: "Email send seccess"
	})
}

module.exports = resendEmail;