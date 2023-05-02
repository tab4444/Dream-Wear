// Import packages
const express = require("express");
const app = express();
const path = require("path");
const home = require("./routes/Router");
const Admin = require("./models/myModel");
const bodyParser = require('body-parser');

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
// Middlewares

app.use(express.json());


//Hashs

//Base de Datos
const mongoose = require("mongoose");

// Routes
app.use("/", home);
app.set("view engine", "ejs");
//Defino la localización de mis vistas
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// connection
const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Listening to port ${port}`));

const DbCredentials="mongodb+srv://DuTienda:ne3sDSoBv3rbGs6a@tiendaonline.hwuvnq5.mongodb.net/TiendaOnline?retryWrites=true&w=majority";
//process.env.DB_KEY
mongoose.set("strictQuery", false);
mongoose.connect(DbCredentials, {
    serverSelectionTimeoutMS:0, 
}) 
.then((con) => {
    console.log("Conectado a la DB");
});