import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

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
  const handleSignup = async credentials => {
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
    errorMessage.value = "";
    try {
      const { data: usernameAlreadyTaken } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .single();

      if (usernameAlreadyTaken)
        return (errorMessage.value = "Username already exists");

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) return (errorMessage.value = error.message);

      await supabase.from("users").insert({
        username,
        email,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {};
  const getUser = () => {};
  const clearErrorMessage = () => {
    errorMessage.value = "";
  };
  return {
    user,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
    errorMessage,
  };
});
