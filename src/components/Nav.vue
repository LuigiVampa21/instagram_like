<script setup>
import AuthModal from "./AuthModal.vue";
import Container from "./Container.vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/users";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const router = useRouter();
const searchUserName = ref("");
const { user, loadingUser } = storeToRefs(userStore);
const onSearch = () => {
  if (!searchUserName.value) return;
  router.push(`/profile/${searchUserName.value}`);
  searchUserName.value = "";
};
const handleLogout = async () => {
  await userStore.handleLogout();
};
</script>

<template>
  <a-layout-header>
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Instagram</RouterLink>
          <a-input-search
            v-model:value="searchUserName"
            placeholder="Username.."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div v-if="!loadingUser" class="content">
          <div class="left-content" v-if="!user">
            <AuthModal :isLogin="true" />
            <AuthModal :isLogin="false" />
          </div>
          <div class="left-content" v-else>
            <a-button type="primary">Profile</a-button>
            <a-button type="primary" @click="handleLogout">Log out</a-button>
          </div>
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
.content {
  display: flex;
  align-items: center;
}
</style>
