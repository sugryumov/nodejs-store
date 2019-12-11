const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const postersRoutes = require("./routes/posters");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/posters", postersRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url = `mongodb+srv://sergey:siuRSRk7hAAHT4P@cluster0-ova9i.mongodb.net/shop`;

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
