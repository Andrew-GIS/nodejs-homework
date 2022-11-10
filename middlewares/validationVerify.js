const { RequestError } = require("../helpers");
const { User } = require("../models/user/user");


const validationVerify = async(req, res, next) => {
	try{
		const { email } = req.body;
		if (!email) {
			throw RequestError(400, "missing required field email")
		}
		const user = await User.findOne({ email });
		if (!user) {
			throw RequestError(404, "Please check your email, please")
		}
		if (user.verify) {
			throw RequestError(400, "Verification has already been passed")
		}
		next();
	}
	catch(error){
		next(error);
	}
}

module.exports = validationVerify;