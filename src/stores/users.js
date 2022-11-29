import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  let errorMessage = ref("");

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {};
  const handleSignup = credentials => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      return (errorMessage.value = "Password is too short");
    }

    if (username.length < 4) {
      return (errorMessage.value = "Username is too short");
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is not valid");
    }
  };
  const handleLogout = () => {};
  const getUser = () => {};
  return {
    user,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    errorMessage,
  };
});
