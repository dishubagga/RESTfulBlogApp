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
    image:"https://images.unsplash.com/photo-1508814437933-f0c7d18a9217?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7c9c7524911773eb70987b911888517&auto=format&fit=crop&w=750&q=80",
    body:"first"
})
app.get("/",(req,res)=>{
    res.redirect("/blogs");
})

app.get("/blogs",(req,res)=>{
    Blog.find({},function(error,blogs){
        if(error){
            console.log(error);    
        }
        else{
            res.render("index",{blogs:blogs})
        }    
    })
})

app.listen("3000",(req,res)=>{
    console.log("server connected");
})