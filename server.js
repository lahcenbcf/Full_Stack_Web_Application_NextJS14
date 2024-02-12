const express = require("express")
const next = require('next')
const fs=require("fs/promises")
const cors=require("cors")
require("dotenv").config()
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express()
  server.use(express.json())
  // Define custom Express routes here
  server.post('/auth', (req, res) => {
    console.log(req.body)
    addUser(req.body)
    res.json({ message: 'successufully added' });
  });

  server.get("/hello",(req,res)=>{
    res.send("hello")
  })

  // Next.js page handling for all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});





async function getDb(db_name){
  const users=await fs.readFile(db_name);
  const data=JSON.parse(users)
  return data
}


async function saveDB(db_name,db){
  console.log("3")
  await fs.writeFile(db_name,JSON.stringify(db))
}

async function addUser(user){
  console.log("1")
    const users=await getDb("users.json")
    if(!users.data.includes(user)){
      users.data.push(user)
      await saveDB("users.json",users)
    }
    return;
}

async function findUser(userid){
    const users=await getDb("users.json")
    return users.find(u => u._id == userid)
}

