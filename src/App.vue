<template>
  <div id="app">
    <main-menu></main-menu>

    <router-view class="main" />
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu";

export default {
  name: "App",
  components: {
    MainMenu
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background-color: $background;
  font-family: "Lato", sans-serif;

  .main {
    //border: 2px solid gray;
    padding: 4rem 5rem;
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
    margin-left: 3.75rem;
  }
}
</style>
