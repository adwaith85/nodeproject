function Admincheck(req,res,next){
    console.log(req.user)
    next();
}

export default Admincheck