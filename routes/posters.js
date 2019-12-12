const { Router } = require("express");
const Poster = require("../models/poster");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posters = await Poster.find();
    res.render("posters", {
      title: "Posters",
      isPosters: true,
      posters
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  try {
    const poster = await Poster.findById(req.params.id);
    res.render("poster-edit", {
      title: `Edit poster ${poster.title}`,
      poster
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/edit", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Poster.findByIdAndUpdate(id, req.body);
  res.redirect("/posters");
});

router.post("/remove", async (req, res) => {
  try {
    await Poster.deleteOne({
      _id: req.body.id
    });
    res.redirect('/posters')
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  const poster = await Poster.findById(req.params.id);
  res.render("poster", {
    layout: "empty",
    title: `Poster ${poster.title}`,
    poster
  });
});

module.exports = router;
