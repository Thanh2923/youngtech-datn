const jwt = require('jsonwebtoken');
const RoleService = require('../services/roleService');
const RolePermissionService = require('../services/rolePermissionService');
const Permission = require('../services/permissionService');
const middlewareController = {
  verifyToken: (req, res, next) => {
    const tokenBear = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.headers.token;
    if (tokenBear || token) {
      const accessToken = tokenBear ? tokenBear : token.split(' ')[1];
      jwt.verify(accessToken, process.env.accessSecretKey, (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ message: 'Token not valid . Please Login again' });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json(`You're not authentication`);
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id) {
        next();
      } else {
        res
          .status(403)
          .json({ message: `You're not allowed to delete other ` });
      }
    });
  },
  verifyTokenAndRole: (roles) => {
    return (req, res, next) => {
      // let userType
      const userRoles = req.user.role; //role is saved in the token payload
      if (roles.includes(userRoles)) {
        next();
      } else {
        return res.status(403).json({
          message: 'You do not have permission to access this Router!',
        });
      }
    };
  },

  checkPermission: (moduleName, permissionName) => {
    console.log(moduleName, permissionName);
    return async (req, res, next) => {
      try {
        const getRoleUser = req.user.role;
        const roleId = await RoleService.checkRole(getRoleUser);
        console.log(roleId);
       
        // check moduleName exist
        const checkModuleExist = await RolePermissionService.checkModuleExist(
          moduleName
        );

        if (!checkModuleExist) {
          return res.status(404).json('module name not found !');
        }

        const permissionId = await Permission.getPermissionId(permissionName);

        if (!permissionId) {
          return res.status(403).json({
            message: `${permissionName} not found !Please check again .`,
          });
        }

        // check permission
        const permission = await RolePermissionService.checkPermission(
          roleId,
          moduleName,
          permissionId
        );

        if (!permission) {
          return res
            .status(403)
            .json({ message: 'Access Denied : Do you not have permission !' });
        }

        next();
      } catch (error) {
        console.error(error);
        // res.status(500).json({message : 'Access Denied : Do you not have permission !'})
        res.status(500).json({ message: 'Serve error' });
      }
    };
  },
};

module.exports = middlewareController;
