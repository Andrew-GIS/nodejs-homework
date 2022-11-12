const { User } = require("../../models/user/user");
const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
    	throw RequestError(400).json({ message: "No user with this email" });
	}
	if (user.verify) {
    	throw RequestError(400, "Verification has already been passed");
  	}
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