<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputField from '@/components/InputField.vue'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const token = route.query?.token
if (!token) router.push({ path: '/' })

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .min(8, 'Be at least 8 characters long')
      .matches(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .matches(/[0-9]/, { message: 'Contain at least one number.' })
      .matches(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim()
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Password must match')
      .required('Please confirm your password'),
  }),
})
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const result = ref(false)
const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.post('http://localhost:3000/auth/reset-password', {
      newPassword: values.password,
      token,
    })
    result.value = true
  } catch (error) {
    toast.error(error)
  }
})
</script>

<template>
  <div v-if="result">
    Password has been successfully changed. You can now <RouterLink to="/">log in</RouterLink>
  </div>
  <form v-else>
    <h1 class="title">Reset Password</h1>
    <InputField
      label="Password"
      type="password"
      name="password"
      v-model="password"
      v-bind="passwordProps"
      :error="errors.password"
      required
    />
    <InputField
      label="Confirm Password"
      type="password"
      name="confirmPassword"
      v-model="confirmPassword"
      v-bind="confirmPasswordProps"
      :error="errors.confirmPassword"
    />
    <ButtonItem type="submit" :onClick="onSubmit" :disabled="isSubmitting"
      >Reset password</ButtonItem
    >
  </form>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.875rem;
}
</style>
