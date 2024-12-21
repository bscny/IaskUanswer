const express = require('express');
require('express-async-errors');

require('module-alias/register');

const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));


// routes are here
// for example:

const UserRoutes = require("@/routes/User/UserRoutes.js");
const FolderRoutes = require("@/routes/Folder/FolderRoutes.js");
const QuizRoutes = require("@/routes/Quiz/QuizRoutes.js");
const QuestionRoutes = require("@/routes/Question/SO_QuestionRoutes.js");

app.use("/User", UserRoutes);
app.use("/Folder", FolderRoutes);
app.use("/Quiz", QuizRoutes);
app.use("/Question", QuestionRoutes);
// routes end

// globally checker for error handling, so we dont need catch for any async func in backend
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send("something is wrong...\n detected in global error handler");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});