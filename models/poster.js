const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

class Poster {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  newPoster() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    };
  }

  async save() {
    const posters = await Poster.getAll();
    posters.push(this.newPoster());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "posters.json"),
        JSON.stringify(posters),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "posters.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Poster;
