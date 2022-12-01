<script setup>
import { defineProps } from "vue";
import UploadPhotoModal from "./UploadPhotoModal.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const props = defineProps(["username", "userInfo"]);
const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { username: profileUsername } = route.params;
</script>
<template>
  <div class="userbar-container">
    <div class="top-content">
      <a-typography-title :level="2">{{ username }}</a-typography-title>
      <UploadPhotoModal v-if="user && profileUsername === user.username" />
    </div>
    <div class="bottom-content">
      <a-typography-title :level="5"
        >{{ userInfo.posts }} post</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ userInfo.followers }} followers</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ userInfo.following }} following</a-typography-title
      >
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;
}
.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-content h2 {
  color: white;
}
.bottom-content h5 {
  margin: 0 !important;
  padding: 0;
  margin-right: 30px !important;
  color: white;
}
</style>
