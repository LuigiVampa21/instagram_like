<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
import { ref, onMounted, watch, reactive } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const posts = ref([]);
const loading = ref(false);
const route = useRoute();
const { username } = route.params;
const userFromProfile = ref(null);
const isFollowing = ref(false);
const userInfo = reactive({
  posts: null,
  followers: null,
  following: null,
});

const updateIsFollowing = follow => {
  isFollowing.value = follow;
};

const addNewPost = post => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    userFromProfile.value = null;
    loading.value = false;
    return;
  }
  userFromProfile.value = userData;

  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", userFromProfile.value.id);
  if (!postsData) {
    posts.value = [];
    loading.value = false;
    return;
  }
  posts.value = postsData;
  loading.value = false;
  await fetchIsFollowing();
  const followerCount = await fetchFollowersCount();
  const followingCount = await fetchFollowingCount();

  userInfo.followers = followerCount;
  userInfo.following = followingCount;
  userInfo.posts = posts.value.length;
};

const fetchIsFollowing = async () => {
  if (user.value && user.value.id !== userFromProfile.value.id) {
    const { data } = await supabase
      .from("followers_following")
      .select()
      .eq("follower_id", user.value.id)
      .eq("following_id", userFromProfile.value.id)
      .single();
    if (data) {
      isFollowing.value = true;
      return;
    }
  }
};

const fetchFollowersCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("following_id", userFromProfile.value.id);

  return count;
};

const fetchFollowingCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("follower_id", userFromProfile.value.id);

  return count;
};

watch(user, () => fetchIsFollowing());

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="$route.params.username"
        :userFromProfile="userFromProfile"
        :isFollowing="isFollowing"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :updateIsFollowing="updateIsFollowing"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div class="spinner" v-else>
      <a-spin></a-spin>
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>
