const { Schema, model } = require('mongoose');
const encriptador = require('bcryptjs');


const userAuth = new Schema({

    userName:String,
    email:{type:String, required: true, unique:true},
    password:String

})

userAuth.methods.encriptarPassword = async (password) => {

    const salt = await encriptador.genSalt(10);  //10 veces aplicaremos el algoritmo     

    return encriptador.hash(password,salt);

}

userAuth.methods.validatePassword = function  (password) {
  
    return encriptador.compare(password, this.password);
}


module.exports  = model('userAuth', userAuth);