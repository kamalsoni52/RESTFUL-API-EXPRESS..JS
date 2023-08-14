const express =require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs")
const app = express();
const port = 8000;

app.use(express.json());

function userDetail(userArray,id){
    let newid = Number(id);
    const user = userArray.find((user)=>{
        return user.id === newid
    })
    return user
}
//Routes
app.get("/",(req,res)=>{
    res.send("Hello Project01")
})

// Get users data
app.get("/users",(req,res)=>{
   return res.json(users)
})

//get the user with particular ID
app.get("/users/:id",(req,res)=>{
   return res.json(userDetail(users,req.params.id));
});

//create new user with POST request
app.post("/users",(req,res)=>{
    const data = req.body;
    console.log(data)
    users.push({id: users.length+1,...data});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err, data)=>{        
        return res.json({ status: 200, id: users.length})        
    })
});

// // update user details using Patch

// app.patch("./users/:id",(req,res)=>{
//     let user = userDetail(users,req.params.id);
    
// });

app.listen(port, ()=>{
    console.log("server started")
});