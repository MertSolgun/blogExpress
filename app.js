require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db");
const app = express();
const PORT = 8001 || process.env.PORT;

connectDB();

/*--------Template Engine----------*/
app.use(expressLayout); // middleware tanimlama
app.use(express.static("public")); //public klasorleri tanimlama
app.set("layout", "./layouts/main"); //layout yolunu tanitma
app.set("view engine", "ejs");
/*--------Template Engine----------*/

app.use("/", require("./server/router/main"));

app.listen(PORT, () => console.log(`Server runned ${PORT}`));
