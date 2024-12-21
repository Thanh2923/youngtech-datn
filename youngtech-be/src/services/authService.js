const authRepository = require('../repositories/authRepository');
const authService = {
  register: async (userName, email, hashPassword) => {
    return await authRepository.register(userName, email, hashPassword);
  },

  findUserByEmail: async (email) => {
    return await authRepository.findUserByEmail(email);
  },

  assignRolesToAccount: async (roleIds, account) => {
    return await authRepository.assignRolesToAccount(roleIds, account);
  },

  saveRefreshToken: async (userId, refreshToken) => {
    return await authRepository.saveRefreshToken(userId, refreshToken);
  },

  checkRefreshTokenExist: async (refreshToken) => {
    return await authRepository.checkRefreshTokenExist(refreshToken);
  },

  saveNewRefreshToken: async (userId, newRefreshToken) => {
    return await authRepository.saveNewRefreshToken(userId, newRefreshToken);
  },

  deleteRefreshTokenOld: async (refreshToken) => {
    return await authRepository.deleteRefreshTokenOld(refreshToken);
  },

  checkRefreshToken: async (refreshToken) => {
    return await authRepository.checkRefreshToken(refreshToken);
  },

  deleteRefreshTokenLogout: async (refreshToken) => {
    return await authRepository.deleteRefreshTokenLogout(refreshToken);
  },
  
  userIdCustomer: async (account) => {
    return await authRepository.userIdCustomer(account);
  },
  // get getRoleId
  
  getRoleId: async (userId) => {
    return await authRepository.getRoleId(userId);
  },

  // getRoleName
  getRoleName: async (getRoleId) => {
    return await authRepository.getRoleName(getRoleId);
  },

  // checkEmailExist(email)
  checkEmailExist : async (email)=> {
    return await authRepository.checkEmailExist(email)
  },

  generateResetToken : async (account , otp , expires)=> {
    return await authRepository.generateResetToken(account , otp , expires)
  },

  validateResetOtp : async (otp) => {
    return await authRepository.validateResetOtp(otp)
  },

  // resetPassword(validateResetToken.id , hashPassword);
  resetPassword : async (email , hashPassword) => {
    return await authRepository.resetPassword(email , hashPassword);
  },

  clearResetToken : async (email)=> {
    return await authRepository.clearResetToken(email)
  },


  // checkOTPExist(otp)
  checkOTPExist : async (email, otp) => {
    return await authRepository.checkOTPExist(email, otp)
  }
 
 
};

module.exports = authService;
