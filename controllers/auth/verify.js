const { User } = require("../../models/user/user");
const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });
	if (!user) {
    	throw RequestError(404);
  	}
	await User.findByIdAndUpdate(user._id, { verify: true, vereficationToken: "" });
	res.json({
		status: `Does verify - ${user.verify}`,
		message: "Email verify seccess"
	})
}

module.exports = verify;