const { User } = require("../../models/user/user");

const RequestError = require("../../helpers");

const updateSubscribeStatus = async (req, res) => {
	const { _id } = req.params;
	//const id = parseInt(_id);
	const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
	if (!result) {
		throw RequestError(404, `user with ${_id} not found`);
	}
	res.json(result);
}

module.exports = updateSubscribeStatus;