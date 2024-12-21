const sequelize = require('../configs/db');
const userRepository = {
  // viewInformationPersonal
  viewInformationPersonal: async (userId) => {
    const query = `SELECT * FROM account WHERE  id= :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: userId },
    });
    return result[0];
  },
  // check user exist
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id =:account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0];
  },
  // enter information
  enterInformation: async (userName, email, userId) => {
    const data = {
      userName: userName,
      email: email,
    };
    const query = `UPDATE account SET userName = :userName, email = :email  WHERE id = :id`;

    const [result] = await sequelize.query(query, {
      replacements: {
        ...data, //
        id: userId, // Make sure  id is explicitly mapped to userID
      },
    });

    return result;
  },

  // checkUserIdChangePassWord
  checkUserIdChangePassWord: async (userId) => {
    const query = `SELECT password FROM account WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: userId },
    });
    return result[0].password;
  },

  // update password by id user
  updateNewPassword: async (hashNewPassword, userId) => {
    const query = `UPDATE account SET password=:password WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { password: hashNewPassword, id: userId },
    });
    return result;
  },
};

module.exports = userRepository;
