<script setup>
import { file } from "@babel/types";
import { ref } from "vue";
import { supabase } from "../supabase";
const visible = ref(false);
const caption = ref("");

const showModal = () => {
  visible.value = true;
};

const handleOk = e => {
  if (!file.value) return;
  
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
      <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
      <a-input
        v-model:value="caption"
        placeholder="Caption..."
        :maxLength="50"
      ></a-input>
    </a-modal>
  </div>
</template>
