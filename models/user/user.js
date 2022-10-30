const { Schema, model } = require("mongoose");
const Joi = require('joi');

const { RequestError, handleSaveErrors } = require("../../helpers");

const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
//https://www.w3resource.com/javascript/form/email-validation.php

const userSchema = new Schema(
	{
		email: {
			type: String,
			match: emailRegex,
      		required: [true, "Email is required"],
      		unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, 'Password is required'],
		},
		
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
	//email: Joi.string().pattern(emailRegex).required(),
	email: Joi.string()
		.trim()
		.pattern(emailRegex)
		.required()
		.error(
			RequestError(
				400,
				"Looks like some problem with your email, please check your info and retry operation"
			)
		),
	password: Joi.string().min(6).required(),
	subscription: Joi.string()
		.valid("starter", "pro", "business")
		.optional()
		.error(
			RequestError(
				400,
				`Please choose your Subscription: "starter", "pro" or "business"`
			)
		),
});

const updateSubscription = Joi.object({
	subscription: Joi.string()
		.required()
		.error(
			RequestError(
				400,
				`Please choose your Subscription: "starter", "pro" or "business"`
			)
		),
})

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegex).required(),
	password: Joi.string().min(6).required(),
})

const schemas = {
	registerSchema,
	loginSchema,
	updateSubscription,
}

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
}