const db = require("../db/sqlmodel");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queryStr = `SELECT * FROM users WHERE username = '${username}';`;
    const result = await db.query(queryStr);
    if (
      username === result.rows[0].username &&
      password === result.rows[0].password
    ) {
      res.status(200).json({
        status: "success",
        token: "fake token",
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
