var bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();
//setting up data base
mongoose.connect("mongodb://localhost/restful_blog_app");

//when we dont want to write file extention.
app.set("view engine","ejs");
//for
app.use(express.static("public"));
//for body parser
app.use(bodyparser.urlencoded({extended:true}));

//schema for database
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created : {type:Date , default:Date.now}
})

var Blog = mongoose.model("Blog",blogSchema);
Blog.create({
    title:"test",
    image:"",
    body:"first"
})


app.listen("3000",(req,res)=>{
    console.log("server connected");
})