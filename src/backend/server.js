const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");

const app = express();
const {
  addItem,
  getItems,
  getAnItem,
  search,
  getByCategory,
} = require("./controllers/item");
const {
  addToCart,
  getCartItems,
  updateCart,
  emptyCart,
} = require("./controllers/cart");
const {
  addOrder,
  findOrder,
  getAllOrders,
  getOrderByParams,
} = require("./controllers/order");
const { signup, signin, accountExist } = require("./controllers/user");
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL_2, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database is connected successfully"))
  .catch((err) => console.log("error connecting to MongoDB"));

app.post("/addItem", addItem);
app.post("/addToCart", addToCart);
app.post("/updateCart", updateCart);
app.get("/getItemList", getItems);
app.get("/items/:item", getAnItem);
app.post("/getCartItems", getCartItems);
app.post("/search/:searchTerm", search);
app.post("/emptyCart", emptyCart);
app.post("/addOrder", addOrder);
app.post("/findOrder", findOrder);
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/getAllOrders", getAllOrders);
app.get("/order-tracking/:userid/:ordernumber", getOrderByParams);
app.post("/account-exist", accountExist);
app.post("/products/:category/:brand", getByCategory);

app.listen(process.env.MONGODB_URI || 8001, () => {
  console.log("server is listening...");
});
