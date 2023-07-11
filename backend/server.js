const db = require("./db/sqlmodel");
const express = require("express");
const userRouter = require("./routes/userRoutes.js");
const cors = require("cors");
const app = express();
const PORT = 3000;

// ALLOWS REQUEST FROM LOCALHOST8080
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// HANDLE PARSE BODY
app.use(express.json());

// ROUTES
app.use("/api/users", userRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ status: "error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
