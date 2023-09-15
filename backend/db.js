const db = require("mysql2")

const connection = db.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"books"

})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
})
  

module.exports = {connection}