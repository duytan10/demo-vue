<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import InputField from '../components/InputField.vue'
import ButtonItem from '@/components/ButtonItem.vue'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { setCookies } from '@/composables/cookies'

interface Errors {
  email: string[]
  password: string[]
}
const router = useRouter()

const errors: Errors = reactive({ email: [], password: [] })

const emailField = ref<string>('')
const passwordField = ref<string>('')

const onSubmit = async (e: Event) => {
  emtyErrors()
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  if (emailField.value && passwordField.value && emailPattern.test(emailField.value)) {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: emailField.value,
        password: passwordField.value,
      })
      setCookies('authToken', response.data.access_token, 1)
      router.push({ name: 'profile' })
    } catch (error) {
      toast.error(`${error.response?.data?.error}: ${error.response?.data?.message}`)
    }
  } else {
    if (!emailField.value) errors.email.push('Email should not be emty!')
    if (!passwordField.value) errors.password.push('Email should not be emty!')
    else if (!emailPattern.test(emailField.value)) errors.email.push('Invalid email!')
  }

  e.preventDefault()
}

function emtyErrors() {
  errors.email = []
  errors.password = []
}
</script>

<template>
  <div>
    <h1 className="title">Login</h1>
    <InputField
      label="Email"
      type="email"
      name="email"
      :errors="errors.email"
      v-model="emailField"
    />
    <InputField
      label="Password"
      type="password"
      name="password"
      :errors="errors.password"
      v-model="passwordField"
    />
    <div class="forget">
      <RouterLink class="forget_link" to="/forget-password">Forget Password</RouterLink>
    </div>
    <ButtonItem type="submit" v-on:click="onSubmit">Log in</ButtonItem>
    <div class="text-sm text-white text-center mt-6 mb-2.5 register">
      <p>
        Don't have an account?
        <RouterLink to="/register" class="font-semibold hover:underline"> Register </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.875rem;
  text-align: center;
}

.forget {
  margin: 36px 0;
  font-size: 0.875rem;
  text-align: right;
}
.forget_link {
  text-decoration: none;
  font-weight: 600;
  color: inherit;
}
.forget_link:hover {
  text-decoration: underline;
}

.register {
  font-size: 0.875rem;
  text-align: center;
  margin: 24px 0 10px;
}

.register p a {
  text-decoration: none;
  font-weight: 600;
  color: inherit;
}

.register p a:hover {
  text-decoration: underline;
}
</style>
