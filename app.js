// ========= import required modules =====================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// ========= set view engine ==================
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// ========= set session ==================
const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const store = new sessionStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: false,
    resave: true,
    store: store,
  })
);
app.use(flash());

// ========= import routes ==================
const homeRout = require("./routes/homeRout");
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const loginRoutes = require("./routes/loginRoutes");

// ========= use routes ==================
app.use("/", homeRout);
// app.use("/product", productRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);
// app.use("/cart", cartRoutes);
// app.use("/login", loginRoutes);

//
app.listen(port, (err) => {
  console.log(`server is runnin on http://localhost:${port}`);
});