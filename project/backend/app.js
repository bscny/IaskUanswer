const express = require('express');
require('express-async-errors');

require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// start init requiremnts
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));


// routes are here--------------------------------------------------------------------------------
// for account controll:
const UserRoutes = require("@/routes/Account/User/UserRoutes.js");

app.use("/User", UserRoutes);

// for user library CRUD:
const FolderRoutes = require("@/routes/Library/Folder/FolderRoutes.js");
const QuizRoutes = require("@/routes/Library/Quiz/QuizRoutes.js");
const QuestionRoutes = require("@/routes/Library/Question/SO_QuestionRoutes.js");

app.use("/Folder", FolderRoutes);
app.use("/Quiz", QuizRoutes);
app.use("/Question", QuestionRoutes);

// for user take quiz
const TakeQuizRoutes = require("@/routes/Quizing/TakeQuizRoutes.js");

app.use("/take-quiz", TakeQuizRoutes);

// for user see past history
const QuizResultRoutes = require("@/routes/Quizing/QuizResultRoutes.js");

app.use("/quiz-result", QuizResultRoutes);

// routes end-------------------------------------------------------------------------------------

// globally checker for error handling, so we dont need catch for any async func in backend
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
})

// run the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});