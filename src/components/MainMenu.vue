<template>
  <div class="main-menu">
    <ul class="main-menu__list">
      <router-link
        to="/"
        role="list"
        class="main-menu__list__item"
        :class="{ active: $route.path === '/' }"
      >
        <v-icon name="home" class="main-menu__list__item__icon" />
      </router-link>

      <router-link to="/" role="list" class="main-menu__list__item">
        <v-icon name="child" class="main-menu__list__item__icon" />
      </router-link>

      <router-link to="/" role="list" class="main-menu__list__item">
        <v-icon name="calendar" class="main-menu__list__item__icon" />
      </router-link>

      <router-link to="/" role="list" class="main-menu__list__item">
        <v-icon name="pen-square" class="main-menu__list__item__icon" />
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100vh;
  width: 4rem;
  position: fixed;
  background-color: $primary;
  //border-right: 2px solid rgb(240, 240, 240);

  &__list {
    padding: 0;
    //margin-top: 5rem;

    &__item {
      list-style: none;
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0.5rem;

      &:hover {
        background-color: $primary-light;
        width: 100%;
        padding-right: calc(0.5rem + 2px);

        .main-menu__list__item__icon {
          color: white;
        }
      }

      &__icon {
        height: 1.75rem;
        width: 1.75rem;
        color: white;
      }
    }

    .active {
      background-color: $background;
      width: 100%;
      margin-right: -2px;
      padding-right: calc(0.5rem + 2px);

      .main-menu__list__item__icon {
        color: $primary;
      }
    }
  }
}
</style>
