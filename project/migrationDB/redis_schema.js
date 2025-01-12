let data;

// ------------------------------------------------------------------------------------------------
// A TestSheet:
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