<script setup lang="ts">
const { disabled = false, type } = defineProps({
  disabled: Boolean,
  type: String,
  onClick: Function,
})
</script>
<template>
  <button :type="type" @click="onClick" :disabled="disabled"><slot></slot></button>
</template>
<style scoped>
button {
  width: 100%;
  padding: 8px 0;
  border-radius: 32px;
  background-color: rgb(255, 255, 255, 1);
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.4s ease;
  font-size: 1rem;
  color: inherit;
}

button:hover {
  background-color: rgb(255, 255, 255, 0.5);
}
</style>
