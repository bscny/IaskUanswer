import { reactive } from 'vue';
import apiClient from '@/service/ApiClient';

export const authState = reactive({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
});

//backend user format
// userI = {
//     Id : ,
//     Name : , 
//     Email : , 
//     Password : 
// } 
async function signup(userInfo) {
    try {
        // change userInfo to match backend
        userInfo = {
            Name : userInfo.username, 
            Email : userInfo.email, 
            Password : userInfo.password
        }        
        
        const response = await apiClient.post('/User/post-user', userInfo);
        
    if (response.status === 201) {
            authState.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userdata', JSON.stringify(response.data));
        }
        return response;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}


async function login(data) {
    try {
        // Call Backend API
        // const response = await api.get('/User/${Email}/${Password}'); // u didnt write this in your backend tho Mr.nono  

        // fake data:
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

        if (fakeAxiosResponse.status === 200) {
            authState.isAuthenticated = true;
            let item = {
                isAuthenticated: true,
                userID: fakeAxiosResponse.data.id,
                username: fakeAxiosResponse.data.username,
            }
            console.log(JSON.stringify(item))
            localStorage.setItem('userdata', JSON.stringify(item));

        }

        return fakeAxiosResponse;
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    authState.isAuthenticated = false;
    localStorage.removeItem('userdata');
}

export {
    signup,
    login,
    logout,
};

// ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// this service SHOULD NOT appear in accountAPI.js
// when you implement it, put it in quizAPI.js
async function GetRandQuizes() {
    // call backend API to get 9 random quizes
    // const response = await api.get('/Quiz/random-quizzes'); // u didnt write this in your backend tho Mr.nono, but can't blame you
                                                               // this JX guy didnt even tell you to do it
    // fake data:
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
    };

    const fakeAxiosResponse = {
        data: fakeData,
        status: 200,
        statusText: 'OK',
    };

    return fakeAxiosResponse.data.quizzes;
}

export {
    GetRandQuizes,
}