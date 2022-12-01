<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        :key="$route.params.username"
        :username="'Luigi'"
        :userInfo="{
          posts: 4,
          followers: 200,
          following: 412,
        }"
      />
      <ImageGallery
        :posts="[
          {
            id: 1,
            image:
              'https://images.pexels.com/photos/6024542/pexels-photo-6024542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: 2,
            image:
              'https://images.pexels.com/photos/5611714/pexels-photo-5611714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: 3,
            image:
              'https://images.pexels.com/photos/8919484/pexels-photo-8919484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
        ]"
      />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
</style>
