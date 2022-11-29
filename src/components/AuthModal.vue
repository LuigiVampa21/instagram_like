<script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { errorMessage } = storeToRefs(userStore);

const visible = ref(false);

const props = defineProps(["isLogin"]);

const title = props.isLogin ? "Login" : "Signup";

const credentials = reactive({
  email: "",
  username: "",
  password: "",
});

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  userStore.handleSignup(credentials);
};

const handleCancel = () => {
  userStore.clearErrorMessage();
};
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{
      title
    }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</a-button
        >
      </template>
      <a-input
        class="input"
        v-if="!isLogin"
        v-model:value="credentials.username"
        placeholder="Username"
      ></a-input>
      <a-input
        class="input"
        v-model:value="credentials.email"
        placeholder="Email"
      ></a-input>
      <a-input
        class="input"
        type="password"
        v-model:value="credentials.password"
        placeholder="Password"
      ></a-input>
      <a-typography-text v-if="errorMessage" type="danger">{{
        errorMessage
      }}</a-typography-text>
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
