const { Schema, model } = require('mongoose');

const { handleSaveErrors } = require('../../helpers');

const Joi = require("joi");
const { RequestError } = require("../../helpers");

const contactSchema = new Schema({
	    name: {
	      type: String,
	      required: [true, "You should set your Name"],
	    },
	    email: {
	      type: String,
	    },
	    phone: {
	      type: String,
	      match: /^[0-9]+$/,
	    },
	    favorite: {
	      type: Boolean,
	      default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
	  },
		{ versionKey: false, timestamps: true },
)

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required()
    .error(
      RequestError(
        400,
        "Name can't be empty and must contain at least 3 symbols"
      )
    ),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(
      RequestError(
        400,
        "Email can't be empty and must contain domain more than 2 symbols"
      )
    ),

  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .trim()
    .min(6)
    .max(13)
    .required()
    .error(
      RequestError(
        400,
        "Phone can't be empty and must contain at least 6 and less than 13 symbols"
      )
    ),
  favorite: Joi.boolean().optional().default(false),
})
  .min(3)
  .required()
  .error(
    RequestError(
      400,
      "Invalid data, request must contain: (name, email, phone) = string format, favorite is optional."
    )
);
  
const updateFavorite = Joi.object({
  favorite: Joi.boolean()
    .required()
    .error(RequestError(400, "missed 'favorite' field ")),
});

const validateId = Joi.object({
  contactId: Joi.string()
    .min(24)
    .max(24)
    .error(RequestError(400, "Invalid ID. ID must contain 24 symbols")),
});

const schemas = {
  addSchema,
  updateFavorite,
  validateId,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas, 
};