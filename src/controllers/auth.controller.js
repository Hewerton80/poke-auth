const UserSchema = require('../schemas/user.schema');
const { hash, compare } = require('bcryptjs');

const {SECRET } = require('../config/env')
const { sign } = require('jsonwebtoken')
class AuthController{
    async singup(req, res){
        const {nick, pass} = req.body;
        try{
            if(!nick || !pass){
                return res.status(400).json({msg:'Nick e password são obrigatórios'})
            }
            const exists = await UserSchema.findOne({nick})
            if(exists){
                return res.status(400).json({msg:'Já existe um usuario cadastrado com esse nick'})
            }
            const user = new UserSchema({
                nick,
                pass: await hash(pass,10)
            });
            await user.save();
            const payload = {
                id: user._id
            }
            const token = sign(payload, SECRET);
            user.pass = null;
            return res.status(200).json({
                user,
                token
            })
        }  
        catch(err){
            console.log(err);
            return res.status(500).json({err:'intern server error'});
        }
    }
    async singin(req, res){
        const {nick, pass} = req.body;

        try{
            if(!nick || !pass){
                return res.status(400).json({msg:'Nick e password são obrigatórios'})
            }
            const user = await UserSchema.findOne({nick})
            if(!user){
                return res.status(400).json({msg:'Não existe um usuário cadastrado com esse nick'})
            }
            if(! await compare(pass, user.pass)){
                return res.status(400).json({msg:'Senha incorreta'});
            }
            const payload = {
                id: user._id
            }
            const token = sign(payload, SECRET);
            user.pass = null;
            return res.status(200).json({
                user,
                token
            })
        }
        
        catch(err){
            return res.status(500).json({err:'intern server error'})
        }
    }
}

module.exports = new AuthController();