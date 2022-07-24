const express = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs")
const Register = require("./models")
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

// console.log(path.join(__dirname,"/public/index"))
// console.log(path.join(__dirname,"../template/partials"))
app.get("/",(req,res)=>{
    res.render("register")
})
app.get("/register",(req,res)=>{
    res.render("register")
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
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`)
})
