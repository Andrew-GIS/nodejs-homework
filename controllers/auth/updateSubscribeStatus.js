const { User } = require("../../models/user/user");

const RequestError = require("../../helpers");

const updateSubscribeStatus = async (req, res) => {
	const { _id } = req.user;
	const prevSubscription = req.user.subscription;
	const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
	if (!result) {
		throw RequestError(404, `user with ${_id} not found`);
	}
	res.json({
		message: `Subscription type successfully changed from ${prevSubscription} to ${req.body.subscription}`,
		result,
	})
}

module.exports = updateSubscribeStatus;