<script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { errorMessage, loading } = storeToRefs(userStore);

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

const clearCredentials = () => {
  credentials.email = "";
  credentials.username = "";
  credentials.password = "";
  userStore.clearErrorMessage();
};

const handleOk = async () => {
  if (!props.isLogin) {
    await userStore.handleSignup(credentials);
    if (userStore.user.value) {
      clearCredentials();
      visible.value = false;
    }
  } else {
    await userStore.handleLogin(credentials);
    clearCredentials();
    visible.value = false;
  }
};

const handleCancel = () => {
  clearCredentials();
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
          :disabled="loading"
          :loading="loading"
          @click="handleOk"
          >Submit</a-button
        >
      </template>
      <div v-if="!loading" class="input-container">
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
      </div>
      <div v-else class="spinner">
        <a-spin></a-spin>
      </div>
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
.input-container {
  height: 120px;
}
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
</style>
