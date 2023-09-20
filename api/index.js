import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mcq_db",
    password: ""
});


app.get("/", (req, res) => {
    const count = parseInt(req.query.count, 10) || 5; // Default to 5 questions if count is not provided
    // Use the `count` value to limit the number of questions retrieved from the database
    const query = `SELECT q.question_text, GROUP_CONCAT(o.option_text) AS all_options, c.category_text, q.answer FROM questions q
                     JOIN options o ON q.id = o.question_id 
                     JOIN category c ON q.category_id = c.id 
                     GROUP BY q.id, q.question_text, c.category_text, q.answer
                     LIMIT ?;`;

    db.query(query, [count], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// all the categories
app.get("/quiz/cat/", (req, res) => {
    const query = "SELECT * FROM category";
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// display by using the id of the category

app.get("/quiz/cat/:name", (req, res) => {
    const { name } = req.params;
    const count = parseInt(req.query.count, 10) || 5; // Use req.query.count to get the count parameter, defaulting to 5 if not provided
    const query = `SELECT q.*, 
            (SELECT GROUP_CONCAT(option_text)
            FROM options
            WHERE options.question_id = q.id) AS all_options,
            c.category_text
            FROM questions q, category c
            WHERE q.category_id = c.id
            AND c.category_text = ?
            LIMIT ?`;
    db.query(query, [name, count], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// display a certain number of question




app.post('/quiz/add', (req, res) => {
    const { question, category, options, answer } = req.body;

    const categoryInsertQuery = 'INSERT INTO category (category_text) VALUES (?)';
    db.query(categoryInsertQuery, [category], (categoryErr, categoryResult) => {
        if (categoryErr) {
            return res.json('Failed to add category');
        }

        const categoryId = categoryResult.insertId;

        const questionInsertQuery =
            'INSERT INTO questions (question_text, category_id, answer) VALUES (?, ?, ?)';
        db.query(
            questionInsertQuery,
            [question, categoryId, answer],
            (questionErr, questionResult) => {
                if (questionErr) {
                    console.error('Failed to insert question');
                    return res.json('Failed to add question');
                }

                const questionId = questionResult.insertId;
                const optionInsertQuery =
                    'INSERT INTO options (question_id, option_text) VALUES ?';

                // Map options to an array of arrays for bulk insertion
                const optionValues = options.map((option) => [questionId, option]);

                db.query(optionInsertQuery, [optionValues], (optionErr, optionResult) => {
                    if (optionErr) {
                        return res.json('Failed to add options');
                    } else {
                        return res.status(200).json({ message: 'Question added successfully!' });
                    }
                });
            }
        );
    });
});




const port = 8081;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})