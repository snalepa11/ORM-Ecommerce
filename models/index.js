// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

const { DataTypes } = require('sequelize');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (through ProductTag)
//might need to take type: Datatypes.INTEGER out 
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: { name: 'product_id', type: DataTypes.INTEGER } });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: { name: 'tag_id', type: DataTypes.INTEGER } });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
