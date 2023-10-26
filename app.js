var express = require("express")
var mysql = require ("mysql2")
var app = express()
app.use(express.json())

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

// Route to get all items or with parameters
// exemple de requête pour avoir tous les item quio http://localhost:3000/items?parameters=Price=22
app.get('/items', (req, res) => {
    const parameters = req.query.parameters
    if (!parameters){
    con.query("SELECT * FROM items",  (err, result) => { 
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
}
)} else {
    con.query("SELECT * FROM items WHERE "+parameters,  (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
}
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
    const categoryID = req.body.category;
    con.query('INSERT INTO items VALUES (?, ?, ?, ?, ?)', [id, name, description,  price, categoryID], (err) => {
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
    const categoryID = req.body.category;
    con.query("UPDATE items SET name= ?, description = ?, price = ?, categoryID, WHERE idItems = ? ", [name, description, price,categoryID, id], (err) => {
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
app.get('/formulas', (req,res) => {
    const parameters = req.query.parameters
    if (!parameters){
    con.query("SELECT * FROM formulas",  (err, result) => { 
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
}
)} else {
    con.query("SELECT * FROM formulas WHERE "+parameters,  (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
}
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
    const id = req.body.id 
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


// -- Categories ROUTES --

// Route to get all categories
app.get('/categories', (req,res) => {
    con.query("SELECT * FROM categories", function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
})
})

// Route to get a categories
app.get('/categories/:id', (req, res) => {
    const querie_id= "SELECT * FROM categories WHERE id = ?";
    const itemsid = req.params.id 
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
app.post('/categories', (req, res) => {
    const id = req.body.id 
    const name = req.body.name;
    const description = req.body.description;
    const formula= req.body.formulaID;
    con.query('INSERT INTO categories VALUES (?, ?, ?, ?)', [id, name, description,formula], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Inserted');
        }
    });
})

// Route to put
app.put("/categories/:id",(req,res) => {
    const id = req.params.id
    const name = req.body.name;
    const description = req.body.description;
    const formula= req.body.formulaID;
    con.query("UPDATE categories SET name= ?, description = ?, formulaID = ? WHERE id = ? ", [name, description,formula, id], (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Updated');
        }  
})
})

// Route to delete
app.delete("/categories/:id", (req,res) => {
    const id = req.params.id
    con.query("DELETE from categories WHERE id = ?", [id],(err) =>{
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