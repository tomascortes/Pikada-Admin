<template>
  <div class="nav-bar">
    <div class="flex-box">
      <router-link class="nav-cell" to="/">Home</router-link>
    </div>
    <div class="flex-box">
      <router-link class="nav-cell" to="/warnings">Warnings</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<script >
</script>

<style>
body { margin: 0 !important; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-bar{
  flex-direction: row;
  display: flex;
  justify-content: left;
  background-color: #3E6D9C;
  height: 40px;
}
.flex-box{
  margin: 5px;
  border-radius: 6px;
  background-color: #5DA7DB;
  padding-top: 7px;
}
.nav-cell{
  font-family: sans-serif;
  text-decoration: none;
  color: #FDF0E0;
  font-weight: 400;
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 300;
}

.month-center{
  margin-left: 5%;
}
</style>
