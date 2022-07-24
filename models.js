const mongoose = require("mongoose")
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
    if(this.isModified("password")){
        const passwordHash = await bcrypt.hash(password,10);
        console.log(`the current password is ${this.password}`)
        this.password = await bcrypt.hash(password,10);
        this.confirmpassword = undefined
    }
    
    
    next()
})


const Register = new mongoose.model("Register",employeeschema)
module.exports= Register;