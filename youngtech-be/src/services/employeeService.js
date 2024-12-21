const employeeRepository = require('../repositories/employeeRepository');

const employeeService = {
  // checkPhoneNumberExist
  checkPhoneNumberExist : async (phoneNumber) =>  {
    return await employeeRepository.checkPhoneNumberExist(phoneNumber)
  },
 
  createEmployee: async (dataAccount , newAccount) => {
    return await employeeRepository.createEmployee(dataAccount , newAccount);
  },
  
  //checkUserExist
  checkUserExist: async (userId) => {
    return await employeeRepository.checkUserExist(userId);
  },

  viewingListEmployee: async () => {
    return await employeeRepository.viewingListEmployee();
  },
  // updateInformationEmployee
  updateInformationEmployee: async (data, employeeId) => {
    return await employeeRepository.updateInformationEmployee(data, employeeId);
  },
  // viewOnlyEmployee
  viewOnlyEmployee: async (id) => {
    return await employeeRepository.viewOnlyEmployee(id);
  },

  //deleteEmployeeById(id)
  deleteEmployeeById: async (id) => {
    return await employeeRepository.deleteEmployeeById(id);
  },

  // getRoleId(roleName)
  getRoleId : async (roleName) => {
    return await employeeRepository.getRoleId(roleName)
  }
   
  // 
};

module.exports = employeeService;
