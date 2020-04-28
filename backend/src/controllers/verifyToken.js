const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next){

    
    
    const token = req.headers['x-access-token'];
  
   
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        });

    }
  

    try{
        const decoded = await jwt.verify(token, process.env.SECRET_STRING);
        req.userId = decoded.id;
    }catch(e){
        req.userId = false;
    }

    
    next();
}

module.exports = verifyToken;