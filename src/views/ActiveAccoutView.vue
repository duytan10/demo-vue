<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const token = route.query?.token
if (!token) router.push({ path: '/' })
const activate = ref(false)
async function activateAccount() {
  const response = await axios.post('http://localhost:3000/auth/activate', { token })
  activate.value = response.data
}
</script>

<template>
  <div v-if="!activate">
    Click this <a href="#" @click="activateAccount()">link</a> to active your account
  </div>
  <div v-else>Your account has been activated</div>
</template>
