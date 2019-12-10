const { Router } = require("express");
const Cart = require("../models/cart");
const Posters = require("../models/poster");
const router = Router();

router.post("/add", async (req, res) => {
  const poster = await Posters.getById(req.body.id);
  await Cart.add(poster);
  res.redirect("/cart");
});

router.get("/", async (req, res) => {
  const cart = await Cart.fetch();
  res.render("cart", {
    title: "Cart",
    isCart: true,
    posters: cart.posters,
    price: cart.price
  });
});

router.delete("/remove/:id", async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
