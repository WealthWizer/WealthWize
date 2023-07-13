const db = require("../db/sqlmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const generateToken = (result) => {
  const token = jwt.sign(
    { user_id: result.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queryStr = `SELECT * FROM users WHERE username = '${username}';`;
    const result = await db.query(queryStr);
    console.log(result.rows[0]);
    // await bcrypt.compare(password, result.rows[0].password)
    if (password === result.rows[0].password) {
      res.status(200).json({
        status: "success",
        token: generateToken(result),
        username: result.rows[0].username,
        userID: result.rows[0].id,
      });
    } else {
      next("username or password is incorrect");
    }
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    console.log("this is the hashed password", hashed);
    const queryStrCreate = `INSERT INTO users (name, username, password) VALUES ('${name}', '${username}', '${hashed}');`;
    await db.query(queryStrCreate);
    const queryStrRetrieve = `SELECT * FROM users WHERE username = '${username}';`;
    const result = await db.query(queryStrRetrieve);
    res.status(201).json({
      status: "success",
      token: generateToken(result),
      username: result.rows[0].username,
      userID: result.rows[0].id,
    });
  } catch (err) {
    next(err);
  }
};

exports.protectRoute = async (req, res, next) => {
  // RETRIEVING TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("This is the authHeader", authHeader);

  // CHECK IF TOKEN EXISTS
  if (!token) {
    next("no token");
  }

  // VERIFY TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //CHECK IS USER FOR THAT TOKEN EXISTS
  const queryStrRetrieve = `SELECT * FROM users WHERE id = '${decoded.user_id}';`;
  const currUser = await db.query(queryStrRetrieve);
  if (!currUser) return next("user no longer exists");
  // console.log(currUser);
  // req.user = currUser;
  next();
};
