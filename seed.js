const mongoose = require("mongoose");
const product = require("./modules/Product");
mongoose
  .connect("mongodb://localhost:27017/farms")
  .then(() => {
    console.log("mongo connected successfully");
  })
  .catch((err) => {
    console.log("mongo Erro");
    console.log(err);
  });
const productList = [
  { name: "banana", price: 2.5, category: "fruit" },
  { name: "orange", price: 1.5, category: "fruit" },
  { name: "ogra", price: 5.2, category: "vegetable" },
  { name: "milk", price: 3.5, category: "dairy" },
  { name: "onion", price: 2.5, category: "vegetable" },
  { name: "apple", price: 1.3, category: "fruit" },
];
product.insertMany(productList);
