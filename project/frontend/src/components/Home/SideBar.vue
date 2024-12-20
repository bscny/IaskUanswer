<template>
    <div class="sidebar">
      <h2>Navigation</h2>
      <ul>
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
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    height: 100vh;
    position: block;
    top: 0;
    left: 0;
  }
  
  .sidebar h2 {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  
  .sidebar ul {
    list-style: none;
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
    color: #007bff;
  }
  </style>
  