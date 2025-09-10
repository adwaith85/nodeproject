import Category from "../model/cateModel.js";

export const category=async(req,res)=>{
    const category=await Category.find()
    console.log("done")
    res.json(category)
}


export const addcategory=async(req,res)=>{
   try{
     const {name,image}=req.body
    
    console.log(name,image)
    const newcategory=await Category.create({name,image})
    res.json(newcategory)
}catch(err){
    res.json({messege: "error"})
}
}

export const deletecategory=async(req,res)=>{
    
}
