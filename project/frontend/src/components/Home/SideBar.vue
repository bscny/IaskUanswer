<template>
    <div class="sidebar">
        <h2 class="nav">
            Dashboard:
        </h2>

        <ul class="options">
            <li>
                <router-link to="/UserLibrary">My Library</router-link>
            </li>
            <li>
                <router-link to="/QuizView/HistoryPage">Test Records</router-link>
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
    background-color: rgb(134, 134, 134);
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    height: 100vh;
}

.nav {
	position: relative;
    font-size: 1.7em;
    margin-bottom: 0.1em;
	margin-left: 0px;
	margin-right: 20px;
}

.options {
    list-style: none;
    font-size: 2.8vh;
    padding: 0;
}

.sidebar li {
    margin: 15px 0;
}

.sidebar a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.3s;
}

.sidebar a:hover {
    color: #155daa;
}
</style>