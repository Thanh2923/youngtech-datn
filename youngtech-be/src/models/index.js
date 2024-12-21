const Account = require("./accountModel");
const Cart = require("./cartModel");
const CartItem = require("./cartItemModel");
const ChildCategories = require("./childCategoriesModel");
const Comment = require("./commentModel");
const Customer = require("./customerModel");
const Employee = require("./employeeModel");
const InputInvoice = require("./inputInvoiceModel");
const Order = require("./orderModel");
const OrderDetail = require("./orderDetailModel");
const OutInvoice = require("./outInvoiceModel");
const ParentCategories = require("./parentCategoriesModel");
const Product = require("./productModel");
const Role = require("./roleModel");
const Supplier = require("./supplierModel");
const roleAccount = require("./roleAccountModel");
const Image = require("./imageModel");

const RefreshToken = require("./refreshToken");

const rootModel = {
  Account,
  Customer,
  Cart,
  CartItem,
  ChildCategories,
  Comment,
  Employee,
  InputInvoice,
  Order,
  OrderDetail,
  OutInvoice,
  ParentCategories,
  Product,
  Role,
  Supplier,
  roleAccount, 
  Image,
  RefreshToken
};

module.exports = rootModel;
