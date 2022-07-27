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
        console.log(this._id)

        const token = jwt.sign({_id:this._id.toString()},"harishthedeveloperheroworldsaver")
        this.tokens = this.tokens.concat({token:token})
        await this.save();

        console.log(token)
        return token;
    }
    catch(error){
            res.send("the error part"+error)
            console.log("the error part"+error)

    }
}
employeeschema.pre("save",async function(next){
    console.log("this is running")
    // if(this.isModified(password)){
    
        
    
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword =  await bcrypt.hash(this.password,10);
        console.log("step mongoose")
        console.log(`the current password is ${this.password}`)

    next()
})


const Register = new mongoose.model("Register",employeeschema)
module.exports= Register;