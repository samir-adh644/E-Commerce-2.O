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

exports.displayProduct = async(req,res)=>{
    try{
          const productData = await products.findAll()
          return res.status(200).json({success: true,
            data:productData,
          });
    } catch(err){
        return res.status(500).json({message:"Data Not found"})
    }
  
}