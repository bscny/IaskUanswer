<template>
    <div class="sidebar">


        <ul class="options">
            <li>

                <router-link to="/UserLibrary">Library</router-link>
            </li>
            <li>
                <router-link to="/QuizView/HistoryPage">Test History</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {};
    },
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 8vh;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 10.42vw;
    background-color: rgb(196, 196, 196);
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    height: 100vh;
    text-align: center;

}

.nav {
    margin-top: 2vh;
    text-align: center;

}
.options {
    list-style: none;
    width: 100%;
    font-size: 2.8vh;
}

.options li {
    margin: 15px 0;
    min-width: 100%;
}

.options a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.3s;
}

.options li:hover {
    background-color: #a3a3a3;
}
</style>