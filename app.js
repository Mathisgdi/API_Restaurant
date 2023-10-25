var express = require("express")
var mysql = require ("mysql2")
var app = express()
app.use(express.json())

// app.use(express.static('./public'))

// const bodyParser = require('body-parser') // Body parser récupère les données envoyé dans le cors de la requête 
// app.use(bodyParser.urlencoded({ extended: false })) // urlencoded permet de parser les données envoyé dans le cors de la requête sous forme de chaîne de caractère. Extended détermine si les objets JSON doivent être analysés ou non.

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'math26711',
    database: 'test'
})

con.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected !!")
    }
})

// -- ITEMS ROUTES --

// Route to get all items
app.get('/items', (req, res) => {
    con.query("SELECT * FROM items", function (err, result, fields) {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
})
})


// Route to get an item
// Question : peut-on le récup comme cela où il faut juste les values ?
app.get('/items/:id', (req, res) => {
    const querie_id= "SELECT * FROM items WHERE idItems = ?";
    const itemsid = req.params.id
    con.query(querie_id ,[itemsid], function (err, result, fields) {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
})
})


// Route to post 
app.post('/items', (req, res) => {
    const id = req.body.id
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    con.query('INSERT INTO items (idItems, name, description,  price) VALUES (?, ?, ?, ?)', [id, name, description,  price], (err, result) => {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.send('Values Inserted');
        }
    });
})


// Route to post
app.put("/items/:id",(req,res) => {
    const id = req.params.id
    const name = req.params.name;
    const description = req.params.description;
    const price = req.params.price;
    con.query("UPDATE items SET name= ?, description = ?, price = ? WHERE idItems = ? ", [name, description,  price, id], (err, result) => {
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.send('Values Updated');
        }  
})
}


)




app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("on port 3000")
    }
})