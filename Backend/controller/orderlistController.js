const { orders, orderItems, products } = require("../model");

exports.storeBuyMe = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!productId || !qty || qty <= 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // 1️⃣ Get product data
    const productData = await products.findByPk(productId);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = productData.price;

    // 2️⃣ Find or create pending order
    const [order] = await orders.findOrCreate({
      where: {
        userId,
        status: "pending"
      },
      defaults: {
        totalPrice: 0
      }
    });

    // 3️⃣ Find item inside THIS order
    const existingItem = await orderItems.findOne({
      where: {
        orderId: order.id,
        productId
      }
    });

    if (existingItem) {
      await existingItem.update({
        quantity: existingItem.quantity + qty
      });
    } else {
      await orderItems.create({
        orderId: order.id,
        productId,
        quantity: qty,
        price
      });
    }

    // 4️⃣ Recalculate total price
    const items = await orderItems.findAll({
      where: { orderId: order.id }
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await order.update({ totalPrice });

    return res.status(201).json({
      message: "Item added to order",
      orderId: order.id,
      totalPrice
    });

  } catch (err) {
    console.error("BUY NOW ERROR 👉", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};



exports.renderOrders = async (req, res) => {
  try {
    const userId = req.userId; // assumes your auth middleware sets this

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch all orders for this user with their orderItems and products
    const userOrders = await orders.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: orderItems,
          include: [
            {
              model: products,
              attributes: ["name", "price"] // only fetch necessary info
            }
          ]
        }
      ]
    });

    // Structure response
    const formattedOrders = userOrders.map(order => ({
      orderId: order.id,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      orderItems: order.orderItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      }))
    }));

    return res.json(formattedOrders);

  } catch (err) {
    console.error("FETCH ORDERS ERROR 👉", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};
