<template>
  <a-layout-header>
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Instagram</RouterLink>
          <a-input-search
            v-model:value="value"
            placeholder="Username.."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div class="left-content">
          <a-button type="primary">Signup</a-button>
          <a-button type="primary">Login</a-button>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>

<script setup>
import Container from "./Container.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const searchUserName = ref("");
const onSearch = () => {};
</script>

<style>
.nav-container {
  display: flex;
  justify-content: space-between;
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 10px;
}

.left-content button {
  margin-left: 10px;
}
</style>
