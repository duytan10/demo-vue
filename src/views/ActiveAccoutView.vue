<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const token = route.query?.token
if (!token) router.push({ path: '/' })
const activate = ref(false)
async function activateAccount() {
  try {
    const response = await axios.post('http://localhost:3000/auth/activate', { token })
    activate.value = response.data
  } catch (error) {
    toast.error(`${error.response?.data?.error}: ${error.response?.data?.message}`)
  }
}
</script>

<template>
  <div v-if="!activate">
    Click this <a href="#" @click="activateAccount()">link</a> to active your account
  </div>
  <div v-else>
    <p>Your account has been activated</p>
    <RouterLink to="/">Login now</RouterLink>
  </div>
</template>
