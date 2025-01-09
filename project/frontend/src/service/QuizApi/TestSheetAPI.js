import api from '@/service/ApiClient';

async function getTestSheetByQuizID_fake(quizId) {

    return [
        {
            "so_id": 1,
            "q_number": 1,
            "body": "Measure find design letter.",
            "optionA": "serve",
            "optionB": "lot",
            "optionC": "natural",
            "optionD": "treat",
            "points": 10
        },
        {
            "so_id": 2,
            "q_number": 2,
            "body": "Ability positive hospital red example.",
            "optionA": "third",
            "optionB": "food",
            "optionC": "international",
            "optionD": "rather",
            "points": 10
        },
        {
            "so_id": 3,
            "q_number": 3,
            "body": "Establish way up who lose worry.",
            "optionA": "true",
            "optionB": "often",
            "optionC": "remain",
            "optionD": "wonder",
            "points": 10
        },
        {
            "so_id": 4,
            "q_number": 4,
            "body": "Hard skill early foreign everything.",
            "optionA": "nice",
            "optionB": "small",
            "optionC": "wall",
            "optionD": "sit",
            "points": 10
        },
        {
            "so_id": 5,
            "q_number": 5,
            "body": "Thing power cut space task indicate line TV.",
            "optionA": "material",
            "optionB": "ten",
            "optionC": "wtf",
            "optionD": "ask",
            "points": 10
        }
    ]

}

async function submitTestSheet_fake(sheet) {
    return {
        data: {
            recordID: 123
        },
        status:200
    };
}
export {
    getTestSheetByQuizID_fake,
    submitTestSheet_fake
}