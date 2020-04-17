
class PokeController{
    index(req, res){
        return res.status(200).json({msg:'ok'})
    }

}

module.exports = new PokeController();