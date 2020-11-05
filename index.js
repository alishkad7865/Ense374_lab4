const express = require("express")
const path = require('path')
var fs = require('fs'); 
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended:true}));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'))
});

app.listen(5000, () => {
  console.log('Listening on port ' + 5000);
});
app.use(express.static(__dirname + '/public'))
class usr_obj{
    //creating constructor for class
    constructor(username, password) {
        this.username = username;
        this.password =password;
      }
}
app.set("view engine","ejs");
//fs.appendFileSync('file.json', 'dataxyz',callback);
class task_obj{
    constructor( id, name ,owner ,creator ,done,cleared){
         this.id =0;
         this.name =name;
         this.owner=owner;
         this.creator= creator;
         this.done= done;
         this.cleared= cleared;
    }
}

let user1= new usr_obj(" user1","user1pass");
console.log(user1.username);
var id= task_obj.id;
let user2= new usr_obj("user2", "user2pass");

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser

app.get("/todo", function(req,res){
    res.render("to-do-list");
})

app.post("/login", function(req,res){
    var read= fs.readFileSync('file.json');
    var parsed= JSON.parse(read);
    console.log(parsed.data[0].email);
    console.log(req.body);
    var x= parsed.data.length;
    for(var i = 0; i < x; i++){
        if(req.body.email === parsed.data[i].email && req.body.password === parsed.data[i].password){
            console.log("login successful");
            res.render("to-do-list");
            break; 
        }
    }
    if((req.body.email != parsed.data[i].email) || (req.body.password!=parsed.data[i].password)){
        console.log("no user found");
        res.redirect("/");
    }
});

var urlencodedParser=bodyParser.urlencoded({ extended:true});
app.post("/register", urlencodedParser, function(req,res){
    var Signup_username = req.body.email;
    console.log(Signup_username);
    var Signup_password = req.body.password;
    //let data = JSON.stringify(Signup_username);
    var read= fs.readFileSync('file.json');
    // let rawdata = JSON.stringify(read);
    //let parsedata = JSON.stringify(read);

    var propfor= JSON.parse(read);
    let parsedata1= propfor.data;
    console.log(parsedata1);
    fs.readFile('file.json', (err, data) => {
        if(parsedata1.email === Signup_username){
            if (err) {throw err;}
            else{
            console.log("user already exits");
            res.redirect('/');
            }
        }
        else
        {
            dataxyz = JSON.stringify(req.body);
            console.log(dataxyz);
            //let dataParse = parsedata1.data.data;
            //fs.appendFileSync('file.json', dataxyz);
            //let dataParse = JSON.parse(data);
            console.log(dataxyz); 
            res.render("to-do-list"); 
        }
    });
});

app.get("/logout", function(req, res){
    console.log("A user logged out")
    //req.logout();
    res.redirect("/");
})


