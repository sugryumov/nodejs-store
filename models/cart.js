const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

class Cart {
  static async add(poster) {
    const cart = await Cart.fetch();
    const idx = cart.posters.findIndex(item => item.id === poster.id);
    const candidate = cart.posters[idx];

    if (candidate) {
      candidate.count++;
      cart.posters[idx] = candidate;
    } else {
      poster.count = 1;
      cart.posters.push(poster);
    }

    cart.price += +poster.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();
    const idx = cart.posters.findIndex(item => item.id === id);
    const poster = cart.posters[idx];

    if (poster.count === 1) {
      cart.posters = cart.posters.filter(item => item.id !== id);
    } else {
      cart.posters[idx].count--;
    }

    cart.price -= poster.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Cart;
