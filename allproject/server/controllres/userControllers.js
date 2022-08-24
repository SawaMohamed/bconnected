const UserModel = require('../models/userModel')

const creatUser = async(req, res) =>{
    // here I must use midleware because when I send json it ll not auto in express, so I use midleware to read the 
    // body to got the information that I need /I ll add in it server.js file
    const {first_name, last_name, email, password, isAdmin, photo, about} = req.body;
    // The new user that I want to store
    const newUser = await UserModel.create({first_name, last_name, email, password, isAdmin, photo, about})
    // The I return it to the Client to knew that his user has already stored
    res.json(newUser)
}
    // Here It should be a group of users not all together we can prass next the next for each group, but I ll do it After
    const getAllusers = async(req, res) =>{
        const allUsers = await UserModel.find()
        res.json(allUsers)
    }
    const getSingleUser = async(req, res) =>{
        const {userId} = req.params;
        const singleUser = await UserModel.findById(userId);
        res.json(singleUser);

    }
    const updateUser = async(req, res) =>{
        const {userId} = req.params;
        const {first_name, last_name, email, password, isAdmin, photo, about} = req.body;
        const updateUser = await UserModel.findByIdAndUpdate(userId, 
            {
            first_name,last_name,email, password, isAdmin, photo, about
        },
        //findByIdAndUpdate method takes 3 things Id, Updating that I want to update and option => new = true
        //when the Client edit something he will got the last edit that he done       
        {new: true}
        );
        res.json(updateUser)
    }
    const deleteUser = async(req, res) =>{
        const {userId} = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        res.json(deletedUser);
    }

 // I test it in tonder and I will change post requst in usersRouter.js to it 
module.exports ={
    creatUser,
    getAllusers,
    updateUser,
    getSingleUser,
    deleteUser,
}