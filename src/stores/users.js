import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  let errorMessage = ref("");
  const loading = ref(false);

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async credentials => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is not valid");
    }

    if (!password.length) {
      return (errorMessage.value = "Please provide a password");
    }

    loading.value = true;
    try {
      const user = await supabase.auth.signInWithPassword(credentials);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

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
    loading.value = true;
    errorMessage.value = "";
    try {
      const { data: usernameAlreadyTaken } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .single();

      if (usernameAlreadyTaken) {
        loading.value = false;
        return (errorMessage.value = "Username already exists");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        email_confirm: true,
      });
      if (error) {
        loading.value = false;
        return (errorMessage.value = error.message);
      }

      await supabase.from("users").insert({
        username,
        email,
      });

      const { data: newUser } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();

      user.value = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        password: newUser,
      };

      loading.value = false;
    } catch (err) {
      console.error(err);
      loading.value = false;
    }
  };
  const handleLogout = () => {};
  const getUser = () => {};
  const clearErrorMessage = () => {
    errorMessage.value = "";
  };
  return {
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
    errorMessage,
  };
});
