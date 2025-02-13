const { Contact } = require('../../models/contacts/contact');
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
