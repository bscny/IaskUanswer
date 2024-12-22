import axios from "axios";

export default {
    async signup(data) {
        return axios.post("/Signup", data);
    },

    async login(data) {
        return axios.post("/Login", data);


    },

    async getFirstNQuizes(n) {
        return axios.get("/", { params: { nQuiz: n } });
    },

    // for testing
    async fake_login(data) {
        const fakeData = {
            id: 1,
            account: data.account,
            password: data.password,
            username: 'Fake User'
        };

        const fakeAxiosResponse = {
            data: fakeData,
            status: 200,
            statusText: 'OK',
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeAxiosResponse), 500); // Simulate async delay
        });
    },

    async fake_signup(data) {
        const fakeData = {
            id: 1,
            account: data.account,
            password: data.password,
            username: data.username
        };

        const fakeAxiosResponse = {
            data: fakeData,
            status: 200,
            statusText: 'OK',
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeAxiosResponse), 500); // Simulate async delay
        });
    },

    async fake_getNQuizes(n) {
        const fakeData = {
            quizzes: [
                {
                    "id": 1,
                    "title": "Tech Titans Trivia",
                    "description": "Test your knowledge of the world's most influential tech companies, innovations, and industry leaders."
                },
                {
                    "id": 2,
                    "title": "World Wonders Quest",
                    "description": "Explore the marvels of the world through a quiz that takes you across continents, cultures, and iconic landmarks."
                },
                {
                    "id": 3,
                    "title": "Brain Buster Bonanza",
                    "description": "Challenge your mind with puzzles, riddles, and brain teasers designed to twist your thinking."
                },
                {
                    "id": 4,
                    "title": "Pop Culture Powerhouse",
                    "description": "Are you the ultimate fan? Dive into the worlds of music, movies, TV, and internet trends."
                },
                {
                    "id": 5,
                    "title": "History Highlights Hunt",
                    "description": "Journey through time with questions about epic events, famous figures, and intriguing historical trivia."
                },
                {
                    "id": 6,
                    "title": "Science Spectrum Showdown",
                    "description": "From the depths of the ocean to the farthest stars, test your scientific curiosity and knowledge."
                },

                {

                    "id": 7,
                    "title": "Game On! Gaming Quiz",
                    "description": "A must-play for gamers! Explore trivia from retro classics to cutting-edge titles."
                },
                {
                    "id": 8,
                    "title": "Foodie Frenzy",
                    "description": "How much do you know about global cuisines, culinary techniques, and mouth-watering dishes?"
                },
                {
                    "id": 9,
                    "title": "Sports Saga Challenge",
                    "description": "Prove your prowess in sports knowledge, from legendary athletes to iconic moments in sports history."
                }
            ]

        }

        const fakeAxiosResponse = {
            data: fakeData,
            status: 200,
            statusText: 'OK',
        };

        return new Promise((resolve) => {
            setTimeout(() => resolve(fakeAxiosResponse), 500); // Simulate async delay
        });
    }
}