const { carts, products } = require("../model");

exports.handleAddToCart = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { productId, quantity } = req.body;
    const userId = req.userId

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const existingData = await carts.findOne({
        where:{productId,userId}
    })

    if(existingData){
        await carts.update(
            {quantity:existingData.quantity+quantity},
            {where:{userId,productId}}
        );

         res.status(201).json({ message: "Cart Updated" });
    }

    else {
         await carts.create({
      userId,
      productId,
      quantity
    });

    res.status(201).json({ message: "Cart Updated" });
    }
   
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.showCartList = async(req,res)=>{
    try{
        const userId = req.userId;
        const singleCart = await carts.findAll({
            where:{userId},
            attributes:["id","quantity","productId"],
            include:[
                {
                    model: products,
                    attributes: ['name']
                }
            ],
        });
        return res.json(singleCart)
    } catch(err){
        res.status(500).json({message:"Failed to load"})
    }
    

}
