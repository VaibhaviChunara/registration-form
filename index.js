const express =  require("express")
const mongoose =  require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 2000

const username = process.env.MONGODB_USERANME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@vaibhavi.qoz45wv.mongodb.net/?retryWrites=true&w=majority&appName=vaibhavi` , {
  useNewUrlParser : true ,
   useUnifiedTopology : true ,
})

const registrationSchema  = new mongoose.Schema({
  name : String,
  email : String,
  password : String
})

const Registraion = mongoose.model("Registration", registrationSchema);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/',  (req, res) => {
    res.sendFile(__dirname + "/pages/index.html")
  });

app.post("/register" , async (req, res)=>{
  try 
  {
    const{name,email,password} = req.body;
    const existingUser =  Registraion.findOne({email : email });
      if(!existingUser){
        const registrationData = new Registraion({
          name,
          email,
          password
        });
        await registrationData.save();
        res.redirect("/success");
    }
    else{
      alert("User already exist!");
      res.redirect("/error");
    }
  }
  catch(error)
  {
    console.log(error)
    res.redirect("error")
  }
})


app.get("/success" , (req,res) => { 
  res.sendFile(__dirname + "/pages/success.html");
})
app.get("/error" , (req,res) =>{
  res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port,()=> {
    console.log(`server is running on ${port}`)
})