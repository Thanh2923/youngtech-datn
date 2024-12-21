const customerService = require('../services/customerService');

const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await customerService.getAllCustomers();

      if (!customers) {
        return res.status(404).json({ message: 'Can not get customers ' });
      }
      res.status(200).json({ data:customers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCustomersById: async (req, res) => {
    const id = req.user.id
    try {
      const customers = await customerService.getCustomersById(id);
      res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  viewCustomerById: async (req, res) => {
    const id = req.params.id;
    try {
      const customers = await customerService.getCustomersById(id);

      if (!customers) {
        return res.status(404).json({ message: 'Can not get customers ' });
      }
      res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // addInformation
  addInformationCustomer: async (req, res) => {
    try {
      // get user need add information
      const userId = req.user.id;
      const data = req.body;
      console.log(data);
      // if (data.userName == '' || data.phoneNumber == '' || data.address == '') {
      //   return res
      //     .status(404)
      //     .json({ message: 'Information invalid! Please check again .' });
      // }
      // then check user exist in table customer
      const checkAccountExist = await customerService.checkAccountExist(userId);
      console.log(checkAccountExist);
      if (!checkAccountExist) {
        return res.status(404).json({ message: 'Not found !' });
      }
      // ADD info by account user
      const addInformationByAccount =
        await customerService.addInformationByAccount(data, checkAccountExist);
      if (!addInformationByAccount) {
        return res.status(404).json({ message: 'fail' });
      }
      return res.status(200).json({ message: addInformationByAccount });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  updateCustomerByMe: async (req, res) => {
    try {
      // get user need add information
      const userId = req.user.id;
      const data = req.body;
      console.log(userId)
      console.log(data)
      const result = await customerService.updateCustomerByMe(data,userId);
      
      return res.status(200).json({ data:result});
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  // editCustomer
  editCustomer: async (req, res) => {
    try {
      // user id u want edit
      const userId = req.params.id;
      const checkUserIdExist = await customerService.checkAccountExist(userId);
      console.log(checkUserIdExist);
      if (!checkUserIdExist) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      const updateData = {};
      if (req.body.fullName) updateData.fullName = req.body.fullName;
      if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
      if (req.body.address) updateData.address = req.body.address;
      console.log(updateData);
      const editCustomer = await customerService.editCustomer(
        checkUserIdExist,
        updateData
      );
      if (!editCustomer) {
        return res.status(403).json({ message: 'Fail' });
      }
      return res.status(200).json({ message: 'update success!' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  //soft  delete
  softDelete: async (req, res) => {
    //
    try {
      //get id customer u want delete
      const id = req.params.id;
      // check
      const checkUserIdExist = await customerService.checkAccountExist(id);
      if (!checkUserIdExist) {
        return res.status(404).json('not found!');
      }
      const deleteCustomer = await customerService.deleteCustomer(
        checkUserIdExist
      );
      if (!deleteCustomer) {
        return res.status(403).json({ message: 'fail delete!' });
      }
      return res.status(200).json({ message: 'Delete success !' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getOrderHistoryHandler: async (req, res) => {
    const { id } = req.params;
    try {
      const orders = await customerService.getOrderHistoryByCustomerId(id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addCustomerOffline: async (req, res) => {
    try {
      const data = req.body;
      const dataCustomer = { ...data, account_id: null };
      console.log(dataCustomer);
      const createCustomerOffline = await customerService.createCustomerOffline(
        dataCustomer
      );
      if (!createCustomerOffline) {
        return res
          .status(403)
          .json({
            message: 'Fail , can not create customer . Please check again .',
          });
      }
      console.log(createCustomerOffline)
      res
        .status(201)
        .json({
          message: 'Create customer success !',
          data: createCustomerOffline,
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = customerController;
