require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { registerPartial } = require("hbs")

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
    },
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }]
})
employeeschema.methods.generatedAuthToken = async function(){
    try{
      

        const token = jwt.sign({_id:this._id.toString()},process.env.Secret)
        
        this.tokens = this.tokens.concat({token:token})
        await this.save();

       
        return token;
    }
    catch(error){
            res.send("the error part"+error)
            console.log("the error part"+error)

    }
}
employeeschema.pre("save",async function(next){
   
        if(this.isModified("password")){
            console.log(`the current password is ${this.password} `);
            this.password = await bcrypt.hash(this.password,10);
            console.log(`the current password is ${this.password}`)
            this.confirmpassword = this.password;
        }
    next()
})


const Register = new mongoose.model("Register",employeeschema)
module.exports= Register;
