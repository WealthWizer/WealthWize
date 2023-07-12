const db = require("../db/sqlmodel");

const transactionController = {};

transactionController.rangeOfTransactions = async (req, res, next) => {
    console.log('-----> rangeOfTransction is running. req.body: ', req.body)
    try {
        const query = `SELECT * FROM transactions WHERE user_id=1 AND date BETWEEN '${req.body.dateStart}' AND '${req.body.dateEnd}' ORDER BY
        date desc;`;
        const result = await db.query(query);

        if (!result) {
            next('no db result')
        } else {
            console.log('----> rangeOfTRansaction results: ', result.rows);
            res.status(200).send(result.rows)
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = transactionController;