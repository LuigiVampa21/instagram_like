<script setup>
import AuthModal from "./AuthModal.vue";
import Container from "./Container.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const searchUserName = ref("");
const isAuthenticated = ref(false);
const onSearch = () => {};
</script>

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
        <div class="left-content" v-if="!isAuthenticated">
          <AuthModal :isLogin="true" />
          <AuthModal :isLogin="false" />
        </div>
        <div class="left-content" v-else>
          <a-button type="primary">Profile</a-button>
          <a-button type="primary">Log out</a-button>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>

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

.left-content {
  display: flex;
  align-items: center;
}

.left-content button {
  margin-left: 10px;
}
</style>
