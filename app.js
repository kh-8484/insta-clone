const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const { MONGOURI } = require("./config/key");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("front_end/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front_end", "build", "index.html"));
  });
}

// const customMiddleware = (req, res, next) => {
//   console.log("middleware executed");
//   next();
// };

// app.use(customMiddleware);

// app.get("/about", customMiddleware, (req, res) => {
//   res.send("About page");
// });

app.listen(PORT, () => {
  console.log("app is running on ", PORT);
});
