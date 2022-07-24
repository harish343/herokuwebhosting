const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost:27017/registration",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> console.log("connection successfull")).catch((err)=>console.log(err));
mongoose.connect("mongodb+srv://ramradhe:ramradhe123@cluster0.efptl.mongodb.net/registration?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=> console.log("connection successfull")).catch((err)=>console.log(err));
// mongodb+srv://ramradhe:<password>@cluster0.efptl.mongodb.net/?retryWrites=true&w=majority