const db = require("../db/sqlmodel");
const { get } = require("../routes/dataRoutes");

const dataController = {};

//savings table
dataController.savings = async (req, res, next) => {
  console.log("i am in dataController.savings");
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."savings"';
    const result = await db.query(querystr);

    const savingsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings = savingsTable;
    // console.log(res.locals.savings);
    return next();
  } catch (err) {
    next(err);
  }
};

//budget
dataController.budget = async (req, res, next) => {
  // console.log('i am in dataController.budget');
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."budget"';
    const result = await db.query(querystr);

    const budgetTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.budget = budgetTable;
    //    console.log(res.locals.budget);
    return next();
  } catch (err) {
    next(err);
  }
};

//savings_goals
dataController.savings_goals = async (req, res, next) => {
  // console.log('i am in dataController.savings_goals')
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."savings_goals"';
    const result = await db.query(querystr);

    const savings_goalsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.savings_goals = savings_goalsTable;
    //    console.log(res.locals.savings_goals);
    return next();
  } catch (err) {
    next(err);
  }
};

//transactions
dataController.transactions = async (req, res, next) => {
  // console.log('i am in dataController.transactions')
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr =
      'SELECT * FROM "public"."transactions" ORDER BY date LIMIT 100';
    const result = await db.query(querystr);

    const transactionsTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.transactions = transactionsTable;
    //    console.log(res.locals.transactions);
    return next();
  } catch (err) {
    next(err);
  }
};

//users
dataController.users = async (req, res, next) => {
  // console.log('i am in dataController.users')
  try {
    //change querystr when figured out if we are matching userid or username
    const querystr = 'SELECT * FROM "public"."users"';
    const result = await db.query(querystr);

    const usersTable = result.rows;
    // let savingsSum=0;
    // savingstable.forEach(row=>{
    //     savingsSum+=row.amount;
    // })

    res.locals.users = usersTable;
    //    console.log(res.locals.users);
    return next();
  } catch (err) {
    next(err);
  }
};

dataController.savingGoals = async (req, res, next) => {
  try {
    const { user_id, goal, amount } = req.body;
    const qryStr1 = `INSERT INTO savings_goals (user_id, category, goal)
  VALUES (${user_id}, '${goal}', ${amount});`;
    const qryStr2 = `INSERT INTO savings (user_id, category, amount, date)
  VALUES (${user_id}, '${goal}', 0, current_date);`;
    const result1 = await db.query(qryStr1);
    const result2 = await db.query(qryStr2);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

dataController.newExpense = async (req, res, next) => {
  try {
    console.log(req.body);
    const expense = req.body;
    console.log(expense);
    querystr = `INSERT INTO transactions (user_id, category, amount, date, vendor_name)
      VALUES(${expense.userID}, '${expense.category}', ${expense.amount}, '${expense.date}', '${expense.vendorName}')`;

    const result = await db.query(querystr);
    return next();
  } catch (err) {
    next(err);
  }
};

dataController.save = async (req, res, next) => {
  try {
    const savings = req.body;
    const querystr = `INSERT INTO savings (user_id, category, amount, date)
      VALUES(${savings.userID}, '${savings.category}', ${savings.amount}, current_date)
      ON CONFLICT(user_id, category) DO UPDATE SET amount = (SELECT amount + ${savings.amount} FROM savings
      WHERE user_id = ${savings.userID} AND category = '${savings.category}')`;
    await db.query(querystr);

    const checkTotalAndGoal = `SELECT savings.amount = savings_goals.goal AS goal_achieved,
    savings.amount AS total, savings_goals.goal AS goal FROM savings JOIN savings_goals 
    ON savings.user_id = savings_goals.user_id 
    AND savings.category = savings_goals.category 
    WHERE savings.user_id = ${savings.userID} AND savings.category = '${savings.category}';`
    const goal_achieved = await db.query(checkTotalAndGoal);

    return res.status(200).json(goal_achieved.rows[0]);
  } catch (err) {
    next(err);
  }
};

dataController.updateGoal = async (req, res, next) => {
  try {
    const { userID, category, amount } = req.body;
    const updateGoalQuery = `UPDATE savings_goals SET goal = ${amount} WHERE user_id = ${userID} AND category = '${category}'`;
    await db.query(updateGoalQuery);
    const getNewGoalsQuery = `SELECT savings.category AS category, savings.amount AS total, savings_goals.goal AS goal
    FROM savings_goals
    LEFT JOIN savings ON savings_goals.user_id = savings.user_id
    AND savings_goals.category = savings.category
    WHERE savings_goals.user_id = ${userID}`;
    const response = await db.query(getNewGoalsQuery)
    return res.status(200).json(response.rows);
  } catch (err) {
    next(err);
  }
};

dataController.removeGoal = async (req, res, next) => {
  try {
    const { userID, category } = req.query;
    const removeGoalQuery = `DELETE FROM savings_goals WHERE user_id = ${userID} AND category = '${category}'`;
    const removeCategorySavings = `DELETE FROM savings WHERE user_id = ${userID} AND category = '${category}'`;
    await db.query(removeGoalQuery);
    await db.query(removeCategorySavings);
    const getNewGoalsQuery = `SELECT savings.category AS category, savings.amount AS total, savings_goals.goal AS goal
    FROM savings_goals
    LEFT JOIN savings ON savings_goals.user_id = savings.user_id
    AND savings_goals.category = savings.category
    WHERE savings_goals.user_id = ${userID}`;
    const response = await db.query(getNewGoalsQuery)
    return res.status(200).json(response.rows);
  } catch (err) {
    next(err);
  }
};

dataController.getAllStocks = async (req, res, next) => {
  try {
    const querystr = 'SELECT * FROM "public"."stocks"';
    const result = await db.query(querystr);

    const stocksTable = result.rows;
    res.locals.stocks = stocksTable;
    return next();
  } catch (err) {
    next(err);
  }
};

dataController.addStock = async (req, res, next) => {
  try {
    const { user_id, stock_name, stock_price, num_shares } = req.body;
    insertQuery = `INSERT INTO stocks (user_id, stock_name, stock_price, num_shares) VALUES (${user_id.user_id}, '${stock_name.stock_name}', ${stock_price.stock_price}), ${num_shares.num_shares})`;
    await db.query(insertQuery);

    return next(); 
  } catch (err) {
    next(err);
  }
};

// dataController.getStockById = async (req, res, next) => {
//   try {
//     const querystr = `SELECT * FROM "public"."stocks" WHERE user_id = ${req.params.userID} AND stock_id = ${req.params.stockID}`;
//     const result = await db.query(querystr);
//     const stock = result.rows[0];
//     res.json(stock);
//   } catch (err) {
//     next(err);
//   }
// };

dataController.deleteStock = async (req, res, next) => {
  try {
    const deleteQuery = `DELETE FROM stocks WHERE user_id = ${req.query.user_id} AND stock_id = ${req.query.stockID}`;
    await db.query(deleteQuery);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = dataController;
