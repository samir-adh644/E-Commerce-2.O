const makeOrderItemTable = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("orderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return OrderItem;
};

module.exports = makeOrderItemTable;
