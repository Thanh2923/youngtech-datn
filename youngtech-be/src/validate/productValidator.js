const validateProductAttributes = ({
    productName,
    productPrice,
    description,
    quantity,
    brand,
    childCategory_id,
    supplier_id
  }) => {
    const errors = {};
  
    if (!productName || productName.length < 3 || productName.length > 100) {
      errors. productName = "Product name must be between 3 and 100 characters.";
    }
  
    if (!productPrice || isNaN(productPrice) || parseFloat(productPrice) <= 0) {
      errors.productPrice = "Product price must be a positive number.";
    }
  

  
    if (quantity === undefined || !Number.isInteger(Number(quantity)) || quantity < 0) {
      errors.quantity = "Quantity must be a non-negative integer.";
    }

    if (!brand || brand.length < 2) {
      errors.brand = "Brand must be at least 2 characters long.";
    }
  
    if (!Number.isInteger(Number(childCategory_id)) || childCategory_id <= 0) {
      errors.childCategory_id = "Child category ID must be a positive integer.";
    }

    if (description && description.length > 500) {
      errors.description = "Description must not exceed 500 characters.";
    }
  
    if (!Number.isInteger(Number(supplier_id)) || supplier_id <= 0) {
      errors.supplier_id = "Supplier ID must be a positive integer.";
    }
  
    return errors;
  };
  
  module.exports = validateProductAttributes;
  