const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const employeeschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        default:"men"
    },
    phone:{
        type:Number,
        requried:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
employeeschema.pre("save",async function(next){
    console.log("this is running")
    // if(this.isModified(password)){
    
        
    
        this.password = await bcrypt.hash(this.password,10);
        console.log("step mongoose")
        console.log(`the current password is ${this.password}`)
        
        this.confirmpassword = undefined
    

    
    next()
})


const Register = new mongoose.model("Register",employeeschema)
module.exports= Register;