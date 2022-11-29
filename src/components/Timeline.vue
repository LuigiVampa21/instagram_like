<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue";
const data = [
  {
    id: 1,
    username: "Church",
    url: "https://images.pexels.com/photos/5611715/pexels-photo-5611715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "",
  },
  {
    id: 2,
    username: "City",
    url: "https://images.pexels.com/photos/4558413/pexels-photo-4558413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: "Hi guys!",
  },
];
</script>

<template>
  <Container>
    <div class="timeline-container">
      <Card v-for="post in data" :key="post.id" :post="post" />
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
</style>
