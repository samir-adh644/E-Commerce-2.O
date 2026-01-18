const makeOrderTable = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending" // pending | paid | cancelled
    }
  });

  return Order;
};

module.exports = makeOrderTable;
