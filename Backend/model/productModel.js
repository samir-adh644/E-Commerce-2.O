const makeProductTable = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  });

  return Product;
};

module.exports = makeProductTable;
