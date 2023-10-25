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
app.get('/items/:id', (req, res) => {
    const querie_id= "SELECT * FROM items WHERE idItems = ?";
    const itemsid = req.params.id // Le .params récupère le id de l'URL
    con.query(querie_id ,[itemsid], function (err, result) {
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
    const id = req.body.idItems // Le .body récupère ce que l'on met dans le body de la requête (via Postman)
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    con.query('INSERT INTO items VALUES (?, ?, ?, ?)', [id, name, description,  price], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Inserted');
        }
    });
})


// Route to put
app.put("/items/:id",(req,res) => {
    const id = req.params.id
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    con.query("UPDATE items SET name= ?, description = ?, price = ? WHERE idItems = ? ", [name, description,  price, id], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Updated');
        }  
})
})

// Route to delete
app.delete("/items/:id", (req,res) => {
    const id = req.params.id
    con.query("DELETE from items WHERE IdItems = ?", [id],(err) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send('Items Delete');
        }
    })
})


// -- FORMULAS ROUTES --

// Route to get all formulas
app.get('/formulas', (req, res) => {
    con.query("SELECT * FROM formulas", function (err, result, fields) {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
})
})

// Route to get a formula
app.get('/formulas/:id', (req, res) => {
    const querie_id= "SELECT * FROM formulas WHERE id = ?";
    const itemsid = req.params.id // Le .params récupère le id de l'URL
    con.query(querie_id ,[itemsid], function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            res.send(result); 
        }

})
})

// Route to post 
app.post('/formulas', (req, res) => {
    const id = req.body.id // Le .body récupère ce que l'on met dans le body de la requête (via Postman)
    const name = req.body.name;
    const price = req.body.price;
    con.query('INSERT INTO formulas VALUES (?, ?, ?)', [id, name, price], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Inserted');
        }
    });
})

// Route to put
app.put("/formulas/:id",(req,res) => {
    const id = req.params.id
    const name = req.body.name;
    const price = req.body.price;
    con.query("UPDATE formulas SET name= ?, price = ? WHERE id = ? ", [name, price, id], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Updated');
        }  
})
})

// Route to delete
app.delete("/formulas/:id", (req,res) => {
    const id = req.params.id
    con.query("DELETE from formulas WHERE id = ?", [id],(err) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send('Items Delete');
        }
    })
})


app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("on port 3000")
    }
})