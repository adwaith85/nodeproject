import Usermodel from "../model/userModel.js"

export const register=async(req,res)=>{
    const {email,password}=req.body

    await Usermodel.create({email,password})


    res.send("created ok")



}

export const login=async(req,res)=>{
    const {email,password}=req.body

    const user=await Usermodel.findOne({email:email})

    if(user){
        const isMatch=await user.comparePassword(password)

        if(isMatch){
            res.send("login done")
        }else{
            res.send("wrong password")
        }
    }else{
        res.send("no user found")
    }


}