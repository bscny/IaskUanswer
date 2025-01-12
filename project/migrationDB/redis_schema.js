let data;

// ------------------------------------------------------------------------------------------------
// A QuizSheet:
data = [
    {
        SO_id: 1,
        Q_number: 1,
        Body: "am i gay",
        Points: 10,
        Answer: "example option3",
        OptionA: "example option1",
        OptionB: "example option2",
        OptionC: "example option3",
        OptionD: "example option4"
    },
    {
        TF_id: 1,
        Q_number: 1,
        Body: "am i gay",
        Points: 10,
        Answer: true,
    },
]

// redis format:
for (const question of data) {
    await redisCli.rPush(`TestSheet:${Quiz_id}`, JSON.stringify(question));
}

// --------------------------------------------------------------------------------------------------
// User's Records
data = [
    {
        Record_id: 5,
        Total_points: 20,
        Quiz_Date: "2025-01-06T14:39:11.000Z",
        User_id: 1,
        Quiz_id: 1,
        Quiz_name: "test q"
    },
    {
        Record_id: 7,
        Total_points: 50,
        Quiz_Date: "2025-01-12T14:39:11.000Z",
        User_id: 1,
        Quiz_id: 5,
        Quiz_name: "test q 2"
    },
]

// redis format:
for (const record of data) {
    await redisCli.rPush(`User:${USER_ID}:Records`, JSON.stringify(record));
}

// -------------------------------------------------------------------------------------------------------
// A Record Result
data = [
    {
        Q_number: 1,
        Body: "hahaha",
        Answer: "hahaha",
        OptionA: "hah",
        OptionB: "h",
        OptionC: "a",
        OptionD: "hahaha",
        Points: 10,
        Is_correct: 1,
        Choosed_ans: "hahaha"
    },
    {
        Q_number: 2,
        Body: "hahaha",
        Answer: 1,
        Points: 10,
        Is_correct: 1,
    }
]

// redis format:
for (const questionResult of data) {
    await redisCli.rPush(`Record:${Record_id}:Question_result`, JSON.stringify(questionResult));
}