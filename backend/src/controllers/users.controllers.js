const userCtrl = {}
const userModel = require('../models/user');


userCtrl.getUsers = async (req,res) =>{
    const data = await userModel.find();
     res.json(data);
}

userCtrl.createUser = async (req,res) =>{
    const {userName} = req.body;
    const newUser = new userModel({userName});
    await newUser.save();

    res.json(newUser);

}

userCtrl.deleteUser = async (req,res) => {

    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.json('deleted');


}


module.exports = userCtrl;