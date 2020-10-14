var express = require("express");
let path = require("path");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

var tables = [];
var waitList = [];


app.listen(PORT, function(){
    console.log("HOLA");
})

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get("/tables", function(req,res){
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/reserve", function(req,res){
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.get("/api/tables", function(req,res){
    return res.json(tables);
})

app.get("/api/waitlist", function(req,res){
    return res.json(waitList);
})

app.post("/api/tables", function(req,res){
    var newCustomer = req.body;
    console.log(newCustomer);
    if(tables.length < 5) {
        tables.push(newCustomer);
        return res.json(true);
    } else {
        waitList.push(newCustomer);
        return res.json(false);
    }
})

app.post("/api/clear", function(req,res){
    tables = [];
    waitList = [];
})