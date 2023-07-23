//import the model in controller
const User = require('../model/userModel')


//controller and view relation. In mvc architecture view part if it is integrated, view contains front end and we have to establish connection between view and controller which is done by res. render method. 

//after establishing the connectivity |>

const userController = {
    index : (req,res) => {
        res.render('index.ejs')   //connects the view to the controller. Render - accessing, print, display. helps to receive the request + data from the front end(view) and sending response to the front end.
    },
    new : (req,res) => {
        res.render('create.ejs')
    },
    edit : (req,res) => {
        res.render('edit.ejs')
    },
    //create new controller to handle incoming data from the front end
    newUser: async (req,res) => {
        try {
            const newUser = req.body //receive data from from front end

                //email exists or not
                 const extEmail = await User.findOne({email: newUser.email})
                    if(extEmail)
                        return res.status(401).json({msg: `${newUser.email} already exists`})

                //mobile exists or not
                const extMobile = await User.findOne({ mobile: newUser.mobile})
                    if(extMobile)
                        return res.status(401).json({msg: `${newUser.mobile} already exists`})

                        await User.create(newUser)  // to create a new user data
            return res.status(200).json({msg: "User created successfully", newUser})
        }catch(err){
            console.log(err)  
        }
    },
    readUser: async (req,res) => {
        try{
            let users = await User.find()
                res.status(200).json({length: users.length, users})
        }catch(err){
            //500-> internal server error
            return res.status(500).json({msg: err.message})
        }
    },
    readSingleUser: async (req,res) => {
        try {
            let id = req.params.id // ref id from the route

            let single = await User.findById({_id: id})
                if(!single)
                    return res.status(404).json({msg: `Requested user id not found`})
            return res.status(200).json({user:single})
        }catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req,res) => {
        try{
            let id = req.params.id // read id from router params
            const data = req.body
                //user id exist or not
            let extUser = await User.findById({_id: id})
                if(!extUser)
                    return res.status(404).json({msg: `Requested user id not found`})

            //email exists or not
            const extEmail = await User.findOne({email: data.email})
            if(extEmail)
                return res.status(401).json({msg: `${data.email} already exists`})

        //mobile exists or not
        const extMobile = await User.findOne({ mobile: data.mobile})
            if(extMobile)
                return res.status(401).json({msg: `${data.mobile} already exists`})

                //update logic
        await User.findByIdAndUpdate({_id: id}, data)

        return res.status(200).json({msg:`User data updated successfully`})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async(req,res) => {
        try{
            let id = req.params.id

            let extUser = await User.findById({_id: id})
                if(!extUser)
                    return res.status(404).json({msg: `Requested User id not found`})
                
                await User.findByIdAndDelete({_id: id})
                    return res.status(200).json({msg: `User data deleted successfully`})
        } catch (err) {
            return res.status(200).json({msg: err.message})
        }
    },
    pnf : (req,res) => {
        res.render('pnf.ejs') //pnf is default controller so it must be at the end
    }
}

module.exports = userController