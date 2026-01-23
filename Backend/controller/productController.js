const { products } = require("../model")

exports.uploadProduct = async(req,res)=>{
    const {name,description,price,stock} = req.body
    const fileName = req.file.filename
    if (!name || !description){
        return res.status(401).json({
            message:"Invalid Input"
        })
    }

    await products.create({
        name,
        description,
        price,
        stock,
        image: fileName
    })
    return res.status(200).json({
        message:"Done successfully!"
    })
}