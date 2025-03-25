<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfor = reactive({})
const token = localStorage.getItem('token')
axios
  .get('http://localhost:3000/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    Object.assign(userInfor, res.data)
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<template>
  <div>
    <h1 className="title">Profile</h1>
    <InputField
      label="Email"
      type="email"
      name="email"
      :disabled="true"
      v-model="userInfor.email"
    />
    <InputField label="Password" type="password" name="password" />
  </div>
</template>
