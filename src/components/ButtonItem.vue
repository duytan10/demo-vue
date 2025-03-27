<script setup lang="ts">
const { disabled = false, type } = defineProps({
  disabled: Boolean,
  type: String,
  onClick: Function,
  isLoading: { type: Boolean, default: false },
})
</script>
<template>
  <button :type="type" @click="onClick" :disabled="disabled" :class="{ loading: isLoading }">
    <div v-if="isLoading" class="container">
      <div class="bar"></div>
    </div>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  position: relative;
  overflow: hidden;
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
button.loading {
  cursor: not-allowed;
  background-color: rgb(255, 255, 255, 0.5);
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.bar::after {
  content: '';
  min-height: 2px;
  position: absolute;
  background: #023047;
  transform: translateX(-100%);
  animation: animate 2s infinite;
}
.bar::before {
  content: '';
  min-height: 2px;
  position: absolute;
  background: #023047;
  transform: translateX(-100%);
  animation: animate 2s infinite;
  animation-delay: 1s;
}
@keyframes animate {
  0% {
    transform: translateX(-150%);
    min-width: 100px;
  }
  100% {
    transform: translateX(300%);
    min-width: 400px;
  }
}

button:hover {
  background-color: rgb(255, 255, 255, 0.5);
}
</style>
