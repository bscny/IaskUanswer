import api from '@/service/ApiClient';

async function generateFakeQuestions(Record_id) {
    const fakeData = {
        1: [
            {
                "Q_number": 1,
                "Body": "What is the capital of France?",
                "Answer": "Paris",
                "OptionA": "Paris",
                "OptionB": "London",
                "OptionC": "Berlin",
                "OptionD": "Madrid",
                "Points": 30,
                "Is_correct": true,
                "Choosed_ans": "Paris"
            },
            {
                "Q_number": 2,
                "Body": "What is 2 + 2?",
                "Answer": "4",
                "OptionA": "3",
                "OptionB": "4",
                "OptionC": "5",
                "OptionD": "6",
                "Points": 40,
                "Is_correct": true,
                "Choosed_ans": "4"
            },
            {
                "Q_number": 3,
                "Body": "What is 4 + 4?",
                "Answer": "8",
                "OptionA": "8",
                "OptionB": "4",
                "OptionC": "5",
                "OptionD": "6",
                "Points": 30,
                "Is_correct": false,
                "Choosed_ans": "4"
            }
        ],
        2: [
            {
                "Q_number": 1,
                "Body": "What is the largest planet in our solar system?",
                "Answer": "Jupiter",
                "OptionA": "Earth",
                "OptionB": "Mars",
                "OptionC": "Jupiter",
                "OptionD": "Saturn",
                "Points": 50,
                "Is_correct": true,
                "Choosed_ans": "Jupiter"
            },
            {
                "Q_number": 2,
                "Body": "What is the chemical symbol for water?",
                "Answer": "H2O",
                "OptionA": "H2O",
                "OptionB": "O2",
                "OptionC": "CO2",
                "OptionD": "H2",
                "Points": 40,
                "Is_correct": true,
                "Choosed_ans": "H2O"
            },
            {
                "Q_number": 3,
                "Body": "What is the chemical symbol for salt?",
                "Answer": "NACL",
                "OptionA": "H2O",
                "OptionB": "O2",
                "OptionC": "CO2",
                "OptionD": "NACL",
                "Points": 40,
                "Is_correct": false,
                "Choosed_ans": "H2O"
            }
        ],
        3: [
            {
                "Q_number": 1,
                "Body": "What is the speed of light?",
                "Answer": "299,792,458 meters per second",
                "OptionA": "150,000,000 meters per second",
                "OptionB": "299,792,458 meters per second",
                "OptionC": "300,000,000 meters per second",
                "OptionD": "299,792,000 meters per second",
                "Points": 100,
                "Is_correct": true,
                "Choosed_ans": "299,792,458 meters per second"
            },
            {
                "Q_number": 2,
                "Body": "What is the boiling point of water?",
                "Answer": "100 degrees Celsius",
                "OptionA": "100 degrees Celsius",
                "OptionB": "0 degrees Celsius",
                "OptionC": "50 degrees Celsius",
                "OptionD": "200 degrees Celsius",
                "Points": 60,
                "Is_correct": false,
                "Choosed_ans": "50 degrees Celsius"
            }
        ],
        4: [
            {
                "Q_number": 1,
                "Body": "What is the capital of Japan?",
                "Answer": "Tokyo",
                "OptionA": "Tokyo",
                "OptionB": "Osaka",
                "OptionC": "Kyoto",
                "OptionD": "Nagoya",
                "Points": 80,
                "Is_correct": true,
                "Choosed_ans": "Tokyo"
            },
            {
                "Q_number": 2,
                "Body": "What is the capital of Germany?",
                "Answer": "Berlin",
                "OptionA": "Berlin",
                "OptionB": "Munich",
                "OptionC": "Frankfurt",
                "OptionD": "Hamburg",
                "Points": 40,
                "Is_correct": false,
                "Choosed_ans": "Munich"
            }
        ]
    };

    return fakeData[Record_id] || [];
}

export {
    generateFakeQuestions
}