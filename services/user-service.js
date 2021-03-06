var user = require("../models/user") 
var mongoose = require("mongoose")

const User = mongoose.model("User", user)

class UserService {
    
    async Create(email, password){  
        var newUser = new User({ 
            email: email,
            password: password
        })  
        try{
            await newUser.save()    
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async VerifyUser(email, password){
        console.log("Acabei de entrar na função VerifyUser")
        var user = await User.find({"email":email, "password":password}) // ISSO RETORNA UM ARRAY COM TODOS OS USUARIOS QUE BATEM COM A CONDIÇÃO
        console.log("Acabei de verificar se tem um usuario correspondente na base de dados!")
        if(user.length == 0){
            return false
        }
        else{
            return true
        }
    }
}

module.exports = new UserService();