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
  const poster = new Poster(req.body.title, req.body.price, req.body.img);

  await poster.save();

  res.redirect("/posters");
});

module.exports = router;
