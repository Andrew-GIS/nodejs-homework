const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscribeStatus = require("./updateSubscribeStatus");

module.exports = {
	register,
	login,
	getCurrent,
	logout,
	updateSubscribeStatus
}