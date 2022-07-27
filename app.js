const express = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs")
const Register = require("./models")
const bcrypt = require("bcrypt")
require("./conn")
const port = process.env.PORT || 8000;
const static_path = path.join(__dirname,"../public/");
const template_path = path.join(__dirname,"/template/views");
const partials_path = path.join(__dirname,"/template/partials");
// console.log(__dirname,"../templates/partials)
app.use(express.static(static_path))
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)


// // salt password
// const bcrypt = require("bcrypt")
// const securePassword = async(password) =>{
//     const passwordHash = await bcrypt.hash(password,10)
//     console.log(passwordHash)
//     const passwordmatch = await bcrypt.compare(password,passwordHash)
// }




// console.log(path.join(__dirname,"/public/index"))
// console.log(path.join(__dirname,"../template/partials"))
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    try{
        console.log("this is trying")
        const email = req.body.email;
        const password = req.body.password
        const useremail = await Register.findOne({email:email})
        const isMatch = await bcrypt.compare(password,useremail.password)

        if(isMatch){
            res.status(201).render("index");
            console.log("password match")
        }
        else{
            res.send("password are not matching")
        }
    }catch(error){
        res.status(400).send("invalid login details")
    }
})
app.post("/register",async(req,res)=>{
    try{
        console.log(req.body.firstname)
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                age:req.body.age,
               
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
              
            })
            const token = await registerEmployee.generatedAuthToken();  //saving token after return from function by save method
            const registered = await registerEmployee.save();
            res.status(201).render("index")
        }else{
            res.send("password are not matching")
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})

// const jwt = require("jsonwebtoken")
// const createToken = async() =>{
//     const token = await jwt.sign({_id:"62de946fcf17b2906a22a2c4"},"mynameiskhanhmaehoherooonosdfjoo",{expiresIn:"2 seconds"});
//     console.log(token);
// const userVar = await jwt.verify(token,"mynameiskhanhmaehoherooonosdfjoo");

// console.log(userVar);
// }

// createToken();
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`)
})
