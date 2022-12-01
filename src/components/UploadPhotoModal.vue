<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { storeToRefs } from "pinia";
import { defineProps } from "vue";

const props = defineProps(["addNewPost"]);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const visible = ref(false);
const caption = ref("");
const file = ref(null);

const loading = ref(false);
const errorMessage = ref("");
const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = uuidv4();
  if (!file.value) {
    loading.value = false;
    return;
  }
  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/" + fileName, file.value);
  let filePath;
  if (data) {
    filePath = data.path;
    const newPost = await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id,
    });
  }
  if (error) {
    return (errorMessage.value = "Unable to upload image, please try again");
  }
  loading.value = false;
  visible.value = false;
  caption.value = "";
  props.addNewPost({
    url: filePath,
    caption: caption.value,
  });
};

const handleUploadChange = e => {
  if (!e.target.files[0]) return;
  file.value = e.target.files[0];
};
</script>

<template>
  <div>
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
        <a-input
          v-model:value="caption"
          placeholder="Caption..."
          :maxLength="50"
        ></a-input>
        <a-typography-text v-if="errorMessage" type="danger">{{
          errorMessage
        }}</a-typography-text>
      </div>
      <div class="spinner" v-else>
        <a-spin />
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
