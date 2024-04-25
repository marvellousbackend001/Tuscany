const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const app = express();
app.use(cors());
/****************Connecting To  Mysql************************* */
const con = mysql.createConnection({
    host: "srv1107.hstgr.io ",
    user: " u532672005_marvelous12",
    password: "marvEcom123",
    database: "u532672005_E_commerce",
    port: "3306",
});
/*********************************************users authentication and authourizaion************************ */
//creating an endpoint that handles users signup
app.post("/signup", bodyParser.json(), function (req, res) {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        const sql = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;
        con.query(sql, [username, email, hash], function (err, result) {
            if (err) throw err;
            res.send("User created successfully");
        });
    });
});
//creating an endpoint that handles users login
app.post("/login", bodyParser.json(), function (req, res) {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    con.query(sql, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    res.send("Logged in");
                } else {
                    res.send("Incorrect password");
                }
            });
        } else {
            res.send("User not found");
        }
    });
});
//creating an endpoint for Searching 
app.get("/search", bodyParser.json(), function (req, res) {
    const query = req.query.query;
    const sql = "SELECT * FROM tour_packages WHERE title LIKE ?";
    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error searching tour packages' });
        } else {
            res.json(results);
        }
    });
});
//craeting an endpoint for Tour Packages Endpoint
app.post("/tour-packages", bodyParser.json(), function (req, res) {
    const sql = `SELECT * FROM tour_packages`;
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});
//
app.post("/tour-packages/:id", bodyParser.json(), function (req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM tour_packages WHERE id = ?`;
    con.query(sql, [id], function (err, results) {
        if (err) throw err;
        res.send(results[0]);
    });
});
//craeting an endpoint for Shopping Cart Endpoint
app.post("/cart", bodyParser.json(), function (req, res) {
    const { productId, quantity } = req.body;
    const sql = `INSERT INTO cart (product_id, quantity) VALUES (?, ?)`;
    con.query(sql, [productId, quantity], function (err, results) {
        if (err) throw err; ''
        res.send({ message: "Product added to cart" });
    }); 3
});
//creating an endpoint for deleting the cart 
app.post("/cart/remove", bodyParser.json(), function (req, res) {
    const { productId } = req.body;
    const sql = `DELETE FROM cart WHERE product_id = ?`;
    con.query(sql, [productId], function (err, results) {
        if (err) throw err;
        res.send({ message: "Product removed from cart" });
    });
});
//Checkout Endpoint
app.post("/checkout", bodyParser.json(), function (req, res) {
    const { customerName, totalPrice } = req.body;
    const sql = `INSERT INTO orders (customer_name, total_price) VALUES (?, ?)`;
    con.query(sql, [customerName, totalPrice], function (err, results) {
        if (err) throw err;
        res.send({ message: "Checkout successful" });
    });
});








app.listen(3000)
    , console.log("server is running at port 3000")