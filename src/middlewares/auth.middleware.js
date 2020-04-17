const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/env')


class AuthMiddleware{
    authentication(req, res, next){
        const authHeader = req.headers.authorization;
        const profile = req.headers.profile
        if(!authHeader){
            return res.status(401).json({msg: 'token não informado'});
        }

        const parts = authHeader.split(' ');

        if(!parts.length === 2){
            return res.status(401).json({msg: 'token mal formatado'});
        }

        const [scheme, token] = parts;

        if(!/^Bearer$/i.test(scheme)){
            return res.status(401).json({msg: 'token mal formatado' });
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({msg: 'token mal formatado'});
            }
            req.userId = decoded.id;
            return next();
        });   

    }
}
module.exports = new AuthMiddleware();