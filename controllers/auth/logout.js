const { User } = require('../../models/user/user');

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.json({
		message: 'Logout succsess'
	})
}

module.exports = logout;