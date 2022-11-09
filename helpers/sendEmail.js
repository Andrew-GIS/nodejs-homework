const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const {webAPI_Token} = process.env;
sgMail.setApiKey(webAPI_Token);

const sendEmail = async (data) => {
	const mail = { ...data, from: 'fedorchenko.andrii@meta.ua'};
	await sgMail.send(mail);
    return true;
}

module.exports = sendEmail;