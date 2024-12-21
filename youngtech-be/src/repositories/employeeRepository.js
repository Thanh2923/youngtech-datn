const sequelize = require('../configs/db');
const dayjs = require('dayjs');
const employeeRepository = {
  // create employee

  createEmployee: async (dataAccount, newAccount) => {
    try {
      const originalDateOfBirth = dataAccount.dateOfBirth;
      // Đảm bảo định dạng ngày thành 'YYYY-MM-DD' và không thêm múi giờ . DD-MM-YYYY
      const formatDay = dayjs(originalDateOfBirth, 'DD-MM-YYYY').format(
        'YYYY-MM-DD'
      );
      const query = `INSERT INTO employee (fullName , profilePicture , dateOfBirth , phoneNumber , position ,  account_id )
          VALUES (:fullName , :profilePicture , :dateOfBirth , :phoneNumber , :position , :account_id)`;

      const [result] = await sequelize.query(query, {
        replacements: {
          ...dataAccount,
          dateOfBirth: formatDay,
          account_id: newAccount,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },

  //checkUserExist
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM employee WHERE account_id =:account_id `;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result;
  },

  // list employee

  viewingListEmployee: async () => {
    const query = `SELECT * FROM employee`;
    const [result] = await sequelize.query(query);
    return result;
  },

  // updateInformationEmployee

  updateInformationEmployee: async (data, employeeId) => {
    const originalDateOfBirth = data.dateOfBirth;
    // Định dạng ngày từ 'DD-MM-YYYY' thành 'YYYY-MM-DD'
    const formatDay = dayjs(originalDateOfBirth, 'DD-MM-YYYY').format('YYYY-MM-DD');
    
    const query = `
      UPDATE employee
      SET 
        fullName = :fullName,
        profilePicture = :profilePicture,
        dateOfBirth = :dateOfBirth,
        phoneNumber = :phoneNumber,
        position = :position
      WHERE id = :id
    `;
    
    const [result] = await sequelize.query(query, {
      replacements: { 
        ...data, 
        dateOfBirth: formatDay, 
        id: employeeId // Đúng cột account_id với giá trị từ accountId
      },
    });
    
    console.log('Update thành công!');
    return result;
  },

  // viewOnlyEmployee

  viewOnlyEmployee: async (id) => {
    const query = `SELECT 
    e.*, 
    a.email, 
    a.userName 
    FROM 
    employee e
    JOIN 
    account a 
    ON 
    e.account_id = a.id
    WHERE 
    e.id = :id;`;
    const [result] = await sequelize.query(query, { replacements: { id: id } });
    return result[0];
  },

  // deleteEmployeeById(id)
  deleteEmployeeById: async (id) => {
    const query = `DELETE  FROM employee WHERE id=:id`;
    const [result] = await sequelize.query(query, { replacements: { id: id } });
    return result.affectedRows > 0;
  },
  // getRoleId(roleName)
  getRoleId: async (roleName) => {
    const query = `SELECT * FROM role WHERE roleName = :roleName`;
    const [result] = await sequelize.query(query, {
      replacements: { roleName: roleName },
    });
    return result[0].id;
  },

  checkPhoneNumberExist: async (phoneNumber) => {
    const query = `SELECT * FROM employee WHERE phoneNumber = :phoneNumber`;
    const [result] = await sequelize.query(query, {
      replacements: { phoneNumber: phoneNumber },
    });
    return result[0];
  },
};

module.exports = employeeRepository;
