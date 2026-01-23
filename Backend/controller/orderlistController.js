const { orders } = require("../model")

exports.renderOrders = async(req,res)=>{
    const Orders = await orders.findAll({
        where:{userId:req.userId}
    })

    res.json(Orders)

}