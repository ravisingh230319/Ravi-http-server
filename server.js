const { v4: uuidv4 } = require("uuid");
const path = require("path");
const express = require("express");
const app = express();

app.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/json", (req, res) => {
    res.sendFile(path.join(__dirname, "input.json"));
});

app.get("/uuid", (req, res) => {
    res.json({ uuid: uuidv4() });
});

app.get("/status/:statusCode", (req, res) => {
    res.status(req.params.statusCode).send(`<h2>${req.params.statusCode}</h2>`);
});

app.get("/delay/:delayedSec", (req, res) => {
    setTimeout(() => {
        res.send(`<h2>Delayed by ${req.params.delayedSec} seconds</h2>`);
    }, req.params.delayedSec * 1000);
});

app.get("*", (req, res) => {
    res.status(404).send(`<h2>404 Page Not Found</h2>`);
});

app.listen(3000, () => console.log("Listening on port 3000"));
