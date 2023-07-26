const db = require("../db/sqlmodel");

const transactionController = {};

transactionController.rangeOfTransactions = async (req, res, next) => {
<<<<<<< HEAD
  // console.log('-----> rangeOfTransction is running. req.body: ', req.body)
  try {
    // const query = `SELECT * FROM transactions WHERE user_id=${req.body.userID} AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
    const query = `SELECT * FROM transactions WHERE user_id=1 AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
        date desc;`;
    const result = await db.query(query);
=======
    console.log('-----> rangeOfTransction is running. req.body: ', req.body)
    try {
        const query = `SELECT * FROM transactions WHERE user_id=${req.body.userID} AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY date desc;`;

        const result = await db.query(query);
>>>>>>> dev

    if (!result) {
      next("no db result");
    } else {
      // console.log('----> rangeOfTRansaction results: ', result.rows);
      res.status(200).send(result.rows);
    }
  } catch (err) {
    next(err);
  }
};

transactionController.goalTracker = async (req, res, next) => {
  // console.log('-----> goaltracker is running. req.body: ', req.body)
  try {
    const query = `SELECT *
        FROM savings_goals
        LEFT JOIN savings ON savings_goals.user_id = savings.user_id
<<<<<<< HEAD
        AND savings_goals.category = savings.category 
        WHERE savings_goals.user_id = '1';`;
    // WHERE savings_goals.user_id = '${req.body.userID}';`;
=======
        AND savings_goals.category = savings.category
        WHERE savings_goals.user_id = ${req.body.userID}`;
>>>>>>> dev

    const result = await db.query(query);

    if (!result) {
      next("no db result");
    } else {
      // console.log('----> goalTracker results: ', result.rows);
      res.status(200).send(result.rows);
    }
  } catch (err) {
    next(err);
  }
};

transactionController.budgetSetter = async (req, res, next) => {
<<<<<<< HEAD
  // console.log('-----> budget tracker is running. req.body: ', req.body)
  try {
    const query = `
        UPDATE budget
        SET budget = ${req.body.goalAmount}
        WHERE user_id = 1 AND category= '${req.body.goalCategory}';`;
=======
    console.log('-----> budget tracker is running. req.body: ', req.body)
    try {
        // const query = `
        // UPDATE budget
        // SET budget = ${req.body.goalAmount}
        // WHERE user_id = 1 AND category= '${req.body.goalCategory}';`;
        const query = `INSERT INTO budget (user_id, budget, category) VALUES (${req.body.userID}, ${req.body.goalAmount}, '${req.body.goalCategory}')`;
>>>>>>> dev

    const result = await db.query(query);

    if (!result) {
      next("no db result");
    } else {
      console.log("----> budget setter results: ", result.rows);
      res.status(200);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = transactionController;

// SELECT *
// FROM savings_goals
// LEFT JOIN savings ON savings_goals.user_id = savings.user_id;
