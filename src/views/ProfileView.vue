<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputField from '@/components/InputField.vue'
import { deleteCookie, getCookie } from '@/composables/cookies'
import axios from 'axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface userInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  age?: number
}

const router = useRouter()
const userInfor: userInfo = reactive({ email: '', firstName: '', lastName: '', phone: '' })
// const token = localStorage.getItem('token')
const token = getCookie('authToken')
axios
  .get('http://localhost:3000/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    Object.assign(userInfor, res.data)
  })
  .catch((error) => {
    console.log(error)
    localStorage.removeItem('token')
    router.push({ path: '/' })
  })

function signOut() {
  deleteCookie('authToken')
  router.push({ path: '/' })
}
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
    <InputField
      label="First name"
      type="text"
      name="firstName"
      :disabled="true"
      v-model="userInfor.firstName"
    />
    <InputField
      label="Last name"
      type="text"
      name="lastName"
      :disabled="true"
      v-model="userInfor.lastName"
    />
    <InputField
      label="Phone"
      type="phone"
      name="phone"
      :disabled="true"
      v-model="userInfor.phone"
    />
    <InputField label="Age" type="number" name="age" :disabled="true" v-model="userInfor.age" />
    <ButtonItem type="button" :onClick="signOut">Sign out</ButtonItem>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.875rem;
}
</style>
