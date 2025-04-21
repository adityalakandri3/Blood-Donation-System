class UserController {
    async home(req,res){
        res.render('home',{
            title:"Homepage"
        })
    }
}

module.exports = new UserController();