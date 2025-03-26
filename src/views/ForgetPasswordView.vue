<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputField from '@/components/InputField.vue'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import * as yup from 'yup'

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Email must be a valid email').trim().required('Email is required'),
  }),
})
const [email, emailProps] = defineField('email')

const result = ref(false)
const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.post('http://localhost:3000/auth/forgot-password', {
      email: values.email,
    })
    result.value = true
  } catch (error) {
    toast.error(error)
  }
})
</script>

<template>
  <div v-if="result">Please check your email, a password reset link has been sent</div>
  <form v-else>
    <h1 class="title">Forget Password</h1>
    <InputField
      label="Email"
      type="email"
      name="email"
      :error="errors.email"
      v-model="email"
      v-bind="emailProps"
    />
    <ButtonItem type="button" :onClick="onSubmit">Get Password</ButtonItem>
  </form>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.875rem;
}
</style>
