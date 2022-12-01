<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import config from "../../config";
const props = defineProps(["posts"]);
const bucketUrl = ref(config.SUPABASE_BUCKET_URL);
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in props.posts"
      :key="post.id"
      :src="
        'https://asrzzlvqkekqzclcnjcj.supabase.co/storage/v1/object/public/images/' +
        post.url
      "
    />
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
