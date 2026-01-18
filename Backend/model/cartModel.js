const makeCartTable = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  return Cart;
};

module.exports = makeCartTable;
