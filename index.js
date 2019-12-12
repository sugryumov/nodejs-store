const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const postersRoutes = require("./routes/posters");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const User = require("./models/user");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5df1f9f31b33d733137b0ce5");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/posters", postersRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    const url = `mongodb+srv://sergey:siuRSRk7hAAHT4P@cluster0-ova9i.mongodb.net/shop`;

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: "snugryumov@gmail.com",
        name: "Sergey",
        cart: { items: [] }
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
