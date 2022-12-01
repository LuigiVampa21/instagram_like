<script setup>
import Profile from "@/components/Profile.vue";
</script>
<template>
  <Profile :key="$route.params.username" />
</template>

<style scoped></style>
