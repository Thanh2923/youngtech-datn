const employeeService = require('../services/employeeService');
const authController = require('./authControllers');
const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const employeeController = {
  // delete employee by id
  deleteEmployeeById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'User employee not fount' });
      }
      const result = await employeeService.deleteEmployeeById(id);
      console.log(result);
      if (!result) {
        return res.status(403).json({ message: 'Can not Delete !' });
      }
      res.status(200).json({ message: '  delete success!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //only admin can viewing list employee
  viewingListEmployee: async (req, res) => {
    try {
      const result = await employeeService.viewingListEmployee();
      if (!result) {
        return res.status(404).json({ message: 'Can not found' });
      }
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // view a employee by id
  viewOnlyEmployee: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'user employee not fount' });
      }

      const result = await employeeService.viewOnlyEmployee(id);
      if (!result) {
        return res.status(404).json({ message: 'can not found employee!' });
      }
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createEmployee: async (req, res) => {
    try {
      // create account employee
      const dataAccount = req.body;
      const { userName, email, password, ...dataEmployee } = dataAccount;
      // check user name exist 
      // check email exist
      const checkEmailExist = await authService.findUserByEmail(email);

      if (checkEmailExist) {
        return res
          .status(403)
          .json({ message: 'Email exist ! Please try another email !' });
      }
      // check phone number exist
      const checkPhoneNumberExist = await employeeService.checkPhoneNumberExist(
        dataAccount.phoneNumber
      );

      if (checkPhoneNumberExist) {
        return res.status(403).json({
          message: 'Phone number exist ! Please try  another phone number !',
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // create account employee
      console.log(`newAccount`);
      const newAccount = await authService.register(
        userName,
        email,
        hashPassword
      );
      console.log(newAccount)
      if (!newAccount) {
        return res
          .status(403)
          .json({ message: 'Can not create account employee !' });
      }

      console.log(`newAccount ${newAccount}`);

      const roleName = dataEmployee.position;
      // from name role => get role id
      console.log(roleName);

      const getRoleId = await employeeService.getRoleId(roleName);
      if (!getRoleId) {
        return res.status(404).json({ message: 'not found role id employee' });
      }
      console.log(`getRoleId ${getRoleId}`);
      // add roleName and account id employee into table roleAccount
      const addRoleNameIntoRoleAccount = await authService.assignRolesToAccount(
        [getRoleId],
        newAccount
      );

      if (!addRoleNameIntoRoleAccount) {
        return res
          .status(403)
          .json({ message: 'Can not add role name into role account' });
      }

      // create employee
      const newEmployee = await employeeService.createEmployee(
        dataEmployee,
        newAccount
      );
      if (!newEmployee) {
        return res.status(403).json({ message: 'Can not create employee !' });
      }

      return res.status(201).json({ message: 'Create employee success !' });
    } catch (err) {
      return res.status(500).json({ message: `err ${err}` });
    }
  },
  //update information employee
  updateInformationEmployee: async (req, res) => {
    try {
      // update account id
      const employeeId = req.params.employeeId;
      const data = req.body;
      console.log(`data`, data);
      console.log(`employeeId `, employeeId);
      if (
        (data.fullName == '' || data.profilePicture == '',
        data.dateOfBirth == '',
        data.phoneNumber == '',
        data.position == '')
      )
        if (!accountId) {
          return res.status(404).json({ message: 'Account id is not found !' });
        }

      const updateInformationEmployee =
        await employeeService.updateInformationEmployee(data, employeeId);
      if (!updateInformationEmployee) {
        return res.status(403).json({ message: 'Update employee fail !' });
      }

      res.status(200).json({ message: 'update employee success !' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = employeeController;
