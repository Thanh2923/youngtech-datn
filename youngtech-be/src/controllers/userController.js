const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const userController = {
  // viewing personal information
  profile: async (req, res) => {
    const userId = req.user.id;
    // then show profile personal user
    const viewInformationPersonal = await userService.viewInformationPersonal(
      userId
    );

    if (!viewInformationPersonal) {
      return res.status(404).json({
        message: 'User not found < Please Enter information personal !',
      });
    }
    const { id, ...other } = viewInformationPersonal;
    res.status(200).json({ message: other });
  },
  // enter information personal
  createInformationPersonal: async (req, res) => {
    //get userId
    try {
      const userId = req.user.id;
      console.log(userId);
      const { userName, email } = req.body;
      console.log(userName, email);
      // check in data exist userID

      if (userName === '' || email === '') {
        return res
          .status(403)
          .json({ message: 'Please enter information personal! ' });
      }

      const checkUserExist = await userService.checkUserExist(userId);

      if (!checkUserExist) {
        return res
          .status(403)
          .json({ message: 'User id not exist ! Please Sign up' });
      }

      // Start enter information userId

      const enterInformation = await userService.enterInformation(
        userName,
        email,
        userId
      );
      console.log(enterInformation);

      if (!enterInformation) {
        return res
          .status(403)
          .json({ message: 'Please enter information personal' });
      }

      res.status(200).json({ message: 'update information success !' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // change password
  changePassword: async (req, res) => {
    // userId want change pass
    // get oldPassword and newPassword
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const checkUserIdChangePassWord =
      await userService.checkUserIdChangePassWord(userId);
    console.log(checkUserIdChangePassWord);
    if (!checkUserIdChangePassWord) {
      return res
        .status(403)
        .json({ message: 'User id has password not found !' });
    }
    // compare password on data vs oldPassword
    const comparePassword = await bcrypt.compare(
      oldPassword,
      checkUserIdChangePassWord
    );

    if (!comparePassword) {
      return res
        .status(403)
        .json({ message: 'Old Password incorrect. Please check again !' });
    }
    // if ok hash new password then update

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    console.log('hashNewPass', hashNewPassword);

    const updateNewPassword = await userService.updateNewPassword(
      hashNewPassword,
      userId
    );
    if (!updateNewPassword) {
      return res.status(403).json({ message: 'Can not update password' });
    }

    res.status(200).json({ message: 'Change password success' });
  },
};
module.exports = userController;
