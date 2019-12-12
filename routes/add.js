const { Router } = require("express");
const Poster = require("../models/poster");

const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add poster",
    isAdd: true
  });
});

router.post("/", async (req, res) => {
  const poster = new Poster({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user
  });

  try {
    await poster.save();
    res.redirect("/posters");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
