import express from "express";
import db from "./database/createConnection.js";
import createSchemas from "./database/createSchemas.js";
await createSchemas();
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get("/users", async (req, res) => {
    res.send(await db.all("SELECT * FROM users"));
});

app.post("/users", async (req, res) => {
    const {firstname="", middlename="", lastname=""} = req.body;
    const values = [firstname, middlename, lastname];
    const {changes} = await db.run("INSERT INTO users (firstname, middlename, lastname) VALUES (?, ?, ?)", values);
    res.send({rowsAffected: changes});
});

app.put("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const {firstname="", middlename="", lastname=""} = req.body;
    const values = [firstname, middlename, lastname, id];
    const {changes} = await db.run("UPDATE users SET firstname = ?, middlename = ?, lastname = ? WHERE id = ?", values);
    res.send({rowsAffected: changes});
});

app.delete("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const {changes} = await db.run("DELETE FROM users WHERE id = ?", [id]);
    res.send({rowsAffected: changes});
});

const PORT = 6060;
app.listen(PORT);