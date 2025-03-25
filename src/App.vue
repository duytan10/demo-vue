<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section>
    <RouterView />
  </section>
</template>

<style scoped>
section {
  position: relative;
  /* max-width: 400px; */
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  backdrop-filter: blur(55px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
}
</style>
