<template>
	<div class="sidebar">
		<h2 class="nav">
			Navigation list:
		</h2>

		<ul class="options">
			<router-link to="/UserLibrary">My Library</router-link>

		</ul>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	data() {
		return {

		};
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

	width: 10.2vw;
	background-color: rgb(134, 134, 134);
	padding: 20px;
	box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	height: 100vh;
	position: block;
}

.nav {
	font-size: 1.3em;
	margin-bottom: 1em;
}

.options {
	list-style: none;
	font-size: 2.1vh;
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