const bcrypt = require('bcrypt');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const RoleService = require('../services/roleService');
const crypto = require('crypto');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { MailtrapClient } = require('mailtrap');
const { meet } = require('googleapis/build/src/apis/meet');
const passwordEmail = process.env.passwordEmail;
const Email = process.env.Email
const authController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      console.log(userName, email, password);

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // check email
      const checkEmail = await authService.findUserByEmail(email);
      if (checkEmail) {
        return res
          .status(403)
          .json({ message: `Email exist ! Please create new email !` });
      }
      const account = await authService.register(userName, email, hashPassword);
      //id
      console.log(account);
      if (!account) {
        return res.status(404).json({ message: 'Registration failed' });
      }

      //add user id to role account
      const roleName = 'customer';
      const createCustomer = await RoleService.checkRole(roleName);

      const roleIds = req.body.roleIds || [createCustomer];
      await authService.assignRolesToAccount(roleIds, account);

      // add user to customer
      const addUserCustomer = await authService.userIdCustomer(account);

      console.log(addUserCustomer);
      if (!addUserCustomer) {
        return res
          .status(403)
          .json({ message: 'Can not add account_id in customer ' });
      }
      return res.status(201).json({ message: 'Register success !' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  //generateAccessToken
  generateAccessToken: (user, getRoleName) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email, role: getRoleName },
      // secret key
      process.env.accessSecretKey,
      // option
      { expiresIn: '30d' }
    );
  },

  refreshToken: (user) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email },
      // secret key
      process.env.refreshToken,
      // option
      { expiresIn: '365d' }
    );
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // find userName follow email
      const user = await authService.findUserByEmail(email);
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Email use not exit , Please try again !' });
      }

      // get role_id by account_id
      const getRoleId = await authService.getRoleId(user.id);
      console.log('Role id ', getRoleId);

      if (!getRoleId) {
        return res
          .status(403)
          .json({ message: 'Account id not exist in role account' });
      }

      // get role name by role_id
      const getRoleName = await authService.getRoleName(getRoleId);
      if (!getRoleName) {
        return res.status(404).json({ message: 'Role name not found' });
      }
      console.log('role name', getRoleName);
      // if true save role in payload token account
      // then => compare pass login === pass on database ,use bcrypt
      const comparePass = await bcrypt.compare(password, user.password);

      if (!comparePass) {
        return res.status(404).json({ message: 'Password wrong!' });
      }

      if (user && comparePass) {
        const accessToken = authController.generateAccessToken(
          user,
          getRoleName
        );
        const refreshToken = authController.refreshToken(user);

        // save refresh token in data
        const saveRefreshToken = await authService.saveRefreshToken(
          user.id,
          refreshToken
        );

        if (!saveRefreshToken) {
          return res
            .status(403)
            .json({ message: 'Error saving refresh token' });
        }

        const { password, ...others } = user;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'You are not authentication' });
    }

    const checkRefreshTokenExist = await authService.checkRefreshTokenExist(
      refreshToken
    );

    if (!checkRefreshTokenExist) {
      return res
        .status(403)
        .json({ message: 'Refresh token not exist in data' });
    }

    if (new Date() > new Date(checkRefreshTokenExist.expires_at)) {
      return res
        .status(403)
        .json({ message: 'Refresh token has expires ! Please Logout ' });
    }
    // check refresh token match jwt and check refresh  token is exist in data

    jwt.verify(refreshToken, process.env.refreshToken, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Refresh token' });
      }

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.refreshToken(user);

      try {
        await authService.deleteRefreshTokenOld(refreshToken);

        await authService.saveNewRefreshToken(user.id, newRefreshToken);

        return res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        console.error('Error refreshing token:', error);
        res
          .status(500)
          .json({ message: 'Token refresh failed. Please try again later.' });
      }
    });

    // refresh exist in data

    //
  },
  userLogout: async (req, res) => {
    const { refreshToken } = req.body;

    console.log(`refreshToken ${refreshToken}`);

    if (!refreshToken) {
      return res.status(401).json({ message: 'You are not authentication' });
    }

    // check refresh token exist or not

    const checkRefreshToken = await authService.checkRefreshToken(refreshToken);

    if (!checkRefreshToken) {
      return res
        .status(403)
        .json({ message: 'refresh token not found . Please login again !' });
    }

    // if refresh token exist in data delete it
    const deleteRefreshToken = await authService.deleteRefreshTokenLogout(
      refreshToken
    );

    if (deleteRefreshToken) {
      return res.status(200).json({ message: 'Logged out success!' });
    } else {
      return res.status(500).json({ message: `Login Failed` });
    }
  },
  generateOtp: async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(email)
      if (!email) {
        return res.status(404).json({
          message: 'Email không tồn tại.',
        });
      }
      const account = await authService.checkEmailExist(email);

      if (!account) {
        return res.status(404).json({ message: 'Email không tồn tại.' });
      }

      // const OTP = Math.floor(1000 + Math.random() * 9000) this a way manual generate OTP
      // using otpGenerator
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });

      const otpExpires = new Date();
      otpExpires.setMinutes(otpExpires.getMinutes() + 1); // expires in 1 minute

      const generateResetToken = await authService.generateResetToken(
        account,
        otp,
        otpExpires
      );
      if (!generateResetToken) {
        return res
          .status(403)
          .json({ message: 'Can not generate reset otp !' });
      }

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: Email,
          pass: passwordEmail,
        },
      });

      var mailOptions = {
        from: Email,
        to: email,
        subject: `Sending Email`,
        text: `Send OTP ${otp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ message: error });
        } else {
          res.json('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  sendingOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const checkOTPExist = await authService.checkOTPExist(email, otp);

      if (!checkOTPExist) {
        return res.status(404).json({ message: `OTP không đúng ! Vui lòng kiểm tra lại gamil. !` });
      }

      if (Date.now() > new Date(checkOTPExist.otpExpires)) {
        return res
          .status(404)
          .json({ message: `OTP không đúng ! Vui lòng kiểm tra lại gamil . ` });
      }

      res.status(200).json({ message: 'Xác nhận OTP thành công .' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      console.log(email, newPassword)
      const hashPassword = await bcrypt.hash(newPassword, 10);
        
      const resetPassword = await authService.resetPassword(
        email,
        hashPassword
      );
      
      if (!resetPassword) {
        return res.status(403).json({ message: 'Can not reset password !' });
      }
      // clear reset token from database
      await authService.clearResetToken(email);

      return res.status(200).json({ message: 'Password reset successfully !' });
    } catch (error) {
      res.status(500).json({ message: 'internal serve error !' });
    }
  },
};


module.exports = authController;

// STORE TOKEN
//1 . LOCAL STORAGE
//agin SXX
//2 . COOKIES
//AGIN => CSRF =/ SAMESITE
//3 . REDUX STORE --> ACCESSTOKEN
// HTTPONLY COOKIES --> REFRESHTOKEN

// alternative text
