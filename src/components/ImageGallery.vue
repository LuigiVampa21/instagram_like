<script setup>
import { defineProps } from "vue";
const props = defineProps(["posts"]);
</script>

<template>
  <div class="image-gallery-container">
    <img v-for="post in props.posts" :key="post.id" :src="post.image" />
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  justify-self: left;
  flex-wrap: wrap;
}

img {
  margin: 5px;
  width: 200px;
}
</style>
