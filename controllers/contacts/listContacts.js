const { Contact } = require('../../models/contacts/contact');
const { report } = require('../../routes/api/users');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite !== undefined) {
      const result = await Contact.find(
      { owner, favorite }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email");
      return res.json(result);
  }
  else{
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
    res.json(result);
    }
};

module.exports = listContacts;
