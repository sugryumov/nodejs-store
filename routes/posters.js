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

module.exports = router;
