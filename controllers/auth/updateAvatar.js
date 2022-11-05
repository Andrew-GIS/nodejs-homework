const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, '../../', "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
	  const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);

    await Jimp.read(resultUpload)
      .then((file) => {
        return file.resize(250, 250).quality(60).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);

    throw error;
  }
}

module.exports = updateAvatar;
