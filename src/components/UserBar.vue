<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";
import UploadPhotoModal from "./UploadPhotoModal.vue";

const props = defineProps([
  "userFromProfile",
  "userInfo",
  "addNewPost",
  "isFollowing",
  "updateIsFollowing",
]);
const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { username: profileUsername } = route.params;
const followUser = async () => {
  props.updateIsFollowing(true);
  try {
    await supabase.from("followers_following").insert({
      follower_id: user.value.id,
      following_id: props.userFromProfile.id,
    });
  } catch (err) {
    console.error(err);
  }
};
const unFollowUser = async () => {
  props.updateIsFollowing(false);
  try {
    await supabase
      .from("followers_following")
      .delete()
      .eq("follower_id", user.value.id)
      .eq("following_id", props.userFromProfile.id);
  } catch (err) {
    console.error(err);
  }
};
</script>
<template>
  <div class="userbar-container" v-if="props.userFromProfile">
    <div class="top-content">
      <a-typography-title :level="2">{{
        props.userFromProfile.username
      }}</a-typography-title>
      <div v-if="user">
        <UploadPhotoModal
          v-if="profileUsername === user.username"
          :addNewPost="addNewPost"
        />
        <div v-else-if="!props.isFollowing" @click="followUser">
          <a-button>Follow</a-button>
        </div>
        <div v-else @click="unFollowUser">
          <a-button>Unfollow</a-button>
        </div>
      </div>
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
  <div class="userbar-container" v-else>
    <div class="top-content">
      <a-typography-title :level="2">User Not Found</a-typography-title>
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
