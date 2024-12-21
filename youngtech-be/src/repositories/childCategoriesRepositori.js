const sequelize = require('../configs/db');

const childCategoriesRepository = {
    getAllChildCategories: async () => {
        // Truy vấn để lấy tất cả các danh mục con
        const query = `SELECT * FROM childcategories WHERE flag=true`;
        const [result] = await sequelize.query(query);
    
        // Truy vấn tổng số bản ghi
        const countQuery = `SELECT COUNT(*) as total FROM childcategories`;
        const [countResult] = await sequelize.query(countQuery);
    
        return {
            data: result,
            totalItems: countResult[0].total,
        };
    },
    getChildCategoriesById : async (id) => {
        const query = `SELECT * FROM childcategories WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements: {id}});
        return result[0];
    },

    createChildCategories: async (data) => {
      console.log(`Repository ${JSON.stringify(data)}`);
  
      // Bỏ qua giá trị được truyền, luôn đặt flag là true
      const { childCateName, parentCategory_id } = data;
      const flag = true; // Luôn mặc định flag là true
  
      const query = `INSERT INTO childcategories (childCateName, flag, parentCategory_id)
                     VALUES (:childCateName, :flag, :parentCategory_id)`;
      const [result] = await sequelize.query(query, { 
          replacements: { childCateName, flag, parentCategory_id } 
      });
      return result;
  },
  
  

    deleteChildCategories: async (id) =>{
        const query = `UPDATE childcategories 
        SET flag = true WHERE id = :id`; // Đánh dấu xóa mềm
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result;
    },
    restoreChildCategories: async (id) => {
        const query = `UPDATE childcategories SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
      },

    updateChildCategories: async (id, data) =>{
        const query = `UPDATE childcategories 
        SET childCateName = :childCateName, parentCategory_id = :parentCategory_id 
        WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements : {...data, id} });
        return result;
    },

    getChildCategoriesByParentId: async (parentId) => {
        const query = `SELECT * FROM childcategories WHERE parentCategory_id = :parentId`;
        const [results] = await sequelize.query(query, { replacements: { parentId } });
        return results;
    },
    getNameParentCategoriesByChildId : async (childCategoryId) => {
        const query = `
          SELECT 
            parentcategories.id AS parentId,
            parentcategories.name AS parentName,
            childcategories.id AS childId,
            childcategories.childCateName AS childName
          FROM 
            childcategories
          JOIN 
            parentcategories 
          ON 
            childcategories.parentCategory_id = parentcategories.id
          WHERE 
            childcategories.id = :childCategoryId
        `;
      
        const [results] = await sequelize.query(query, {
          replacements: { childCategoryId },
        });
      
        return results.length > 0 ? results[0] : null;
      }
      
};

module.exports = childCategoriesRepository;
