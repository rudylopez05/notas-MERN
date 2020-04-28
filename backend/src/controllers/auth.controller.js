const authCtrl = {};


const User = require('../models/userAuth');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');



authCtrl.signUp = async (req, res, next) => {

    const { userName, email, password } = req.body;

    const user = new User({
        userName,
        email,
        password
    })

    user.password = await user.encriptarPassword(user.password);

    try {
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_STRING, {
            expiresIn: 60 * 60 * 3
        })


        res.json({ auth: true, token: token });
    } catch (e) {

        res.json({ error: true, e });
    }


}

authCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).send('Error: email or password doesnt exists');
        }

        const isValid = await user.validatePassword(password);
        if(!isValid){
            return res.status(401).send({auth:false, token:null});
        }

        const token = await jwt.sign({id: user._id},process.env.SECRET_STRING,{
            expiresIn:60*60*3
        });
        res.json({auth:true, token});

    } catch (e) {
        res.status(401).send({msg:'catch: email or password doesnt exists', e});
    }

}

authCtrl.signOut = (req, res) => {
    res.json({ message: "im signOut" });
}

authCtrl.user = [verifyToken, async  (req, res) => {

   
    try {
        
        if(!req.userId){
            return res.json({message:"token no valido"});
        }
            const user = await User.findById(req.userId, { password: 0 });
        
        if (!user) {
            res.status(404).send('user not found');
        } else {
            res.json({ message: user });
        }
        

    } catch (e) {
        res.status(404).send('Error decodificando token');
    }


}]

module.exports = authCtrl;