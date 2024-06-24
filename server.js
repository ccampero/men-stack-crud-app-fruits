
const dotenv = require("dotenv"); // require package
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Fruit = require("./models/fruit.js");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 




 //GET /
  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  // GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: allFruits });
});


//Get fruits new/ 
 app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

  app.get("/fruits/:fruitId", async (req, res) => {
   const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {  fruit: foundFruit });
    
  });
  
  
  
  // POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      await Fruit.create(req.body);
    res.redirect("/fruits");
  });

  app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });
  
  app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });
  
  // server.js

app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
});



app.listen(3000, () => {
  console.log("Listening on port 3000")
});