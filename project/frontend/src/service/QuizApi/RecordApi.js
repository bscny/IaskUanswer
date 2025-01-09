import api from '@/service/ApiClient';

async function generateFakeRecords() {
    return [
        {
            "Record_id": 1,
            "Total_points": 70,
            "Quiz_Date": "2025-01-06T14:39:11.000Z",
            "User_id": 1,
            "Quiz_id": 1,
            "Quiz_name": "suck"
        },

        {
            "Record_id": 2,
            "Total_points": 90,
            "Quiz_Date": "2025-01-06T18:39:11.000Z",
            "User_id": 1,
            "Quiz_id": 1,
            "Quiz_name": "my"
        },
        {
            "Record_id": 3,
            "Total_points": 100,
            "Quiz_Date": "2025-01-06T19:09:11.000Z",
            "User_id": 1,
            "Quiz_id": 1,
            "Quiz_name": "dick"
        },

        {
            "Record_id": 4,
            "Total_points": 80,
            "Quiz_Date": "2025-01-20T20:20:20.000Z",
            "User_id": 1,
            "Quiz_id": 1,
            "Quiz_name": "baby"
        }
    ]

}

export {
    generateFakeRecords
}