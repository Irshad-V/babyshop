const userModel = require("../../models/userModel")

async function updateUser(req,res){
    try{
        const sessionUser = req.userId

        const { userId , email, name, Role} = req.body

        const UpdateRole = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( Role && { Role : Role}),
        }

        const user = await userModel.findById(sessionUser)


        const updateUser = await userModel.findByIdAndUpdate(userId,UpdateRole)

        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUser