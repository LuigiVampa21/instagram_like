<script setup>
import { ref, defineProps } from "vue";
import { useUserStore } from "../stores/users";

const userStore = useUserStore();
const { errorMessage, handleSignup } = userStore;

const visible = ref(false);

const props = defineProps(["isLogin"]);

const title = props.isLogin ? "Login" : "Signup";

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  visible.value = false;
};
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{
      title
    }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <a-input
        class="input"
        v-if="!isLogin"
        v-model:value="value"
        placeholder="Username"
      ></a-input>
      <a-input
        class="input"
        v-model:value="value"
        placeholder="Email"
      ></a-input>
      <a-input
        class="input"
        v-model:value="value"
        placeholder="Password"
      ></a-input>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
  margin-left: 10px;
}
.input {
  margin-top: 5px;
}
</style>
