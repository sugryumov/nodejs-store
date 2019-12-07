const { Router } = require("express");
const Posters = require("../models/poster");

const router = Router();

router.get("/", (req, res) => {
  Posters.getAll()
    .then(response => {
      const posters = response;

      return posters;
    })
    .then(posters => {
      res.render("posters", {
        title: "Posters",
        isPosters: true,
        posters
      });
    });
});

router.get("/:id/edit", (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  Posters.getById(req.params.id)
    .then(response => {
      const poster = response;

      return poster;
    })
    .then(poster => {
      res.render("poster-edit", {
        title: `Edit poster ${poster.title}`,
        poster
      });
    });
});

router.post("/edit", (req, res) => {
  Posters.update(req.body).then(res.redirect("/posters"));
});

router.get("/:id", async (req, res) => {
  const poster = await Posters.getById(req.params.id);
  res.render("poster", {
    layout: "empty",
    title: `Poster ${poster.title}`,
    poster
  });
});

module.exports = router;
