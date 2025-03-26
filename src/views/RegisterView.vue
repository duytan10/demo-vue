<script setup lang="ts">
import ButtonItem from '@/components/ButtonItem.vue'
import InputField from '@/components/InputField.vue'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import * as yup from 'yup'

const router = useRouter()

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().trim().required('Email is required'),
    firstName: yup.string().trim().required('First name is required'),
    lastName: yup.string().trim().required('Last name is required'),
    phone: yup.string().trim(),
    age: yup.number().positive().integer().max(100).min(1),
    password: yup
      .string()
      .min(8, 'Be at least 8 characters long')
      // .matches(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      // .matches(/[0-9]/, { message: 'Contain at least one number.' })
      // .matches(/[^a-zA-Z0-9]/, {
      //   message: 'Contain at least one special character.',
      // })
      .trim()
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Password must match')
      .required('Please confirm your password'),
  }),
})

const [email, emailProps] = defineField('email')
const [firstName, firstNameProps] = defineField('firstName')
const [lastName, lastNameProps] = defineField('lastName')
const [phone, phoneProps] = defineField('phone')
const [age, ageProps] = defineField('age')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  const { confirmPassword, ...data } = values
  try {
    await axios.post('http://localhost:3000/auth/register', { ...data })
    toast.success('Register successful!')
    setTimeout(() => {
      router.push({ path: '/' })
    }, 2000)
  } catch (error) {
    toast.error(error)
  }
})
</script>

<template>
  <form>
    <h1 className="title">Register</h1>
    <InputField
      v-model="email"
      v-bind="emailProps"
      :error="errors.email"
      label="Email"
      type="email"
      name="email"
      required
    />
    <InputField
      v-model="firstName"
      v-bind="firstNameProps"
      :error="errors.firstName"
      label="First name"
      type="text"
      name="firstName"
      required
    />
    <InputField
      label="Last name"
      type="text"
      name="lastName"
      v-model="lastName"
      v-bind="lastNameProps"
      :error="errors.lastName"
      required
    />
    <InputField
      label="Phone"
      type="phone"
      name="phone"
      v-model="phone"
      v-bind="phoneProps"
      :error="errors.phone"
    />
    <InputField
      label="Age"
      type="number"
      name="age"
      v-model="age"
      v-bind="ageProps"
      :error="errors.age"
    />
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
    <ButtonItem type="submit" v-on:click="onSubmit" :disabled="isSubmitting">Register</ButtonItem>
    <div class="register">
      <p>
        Already have an account?
        <RouterLink to="/">Login</RouterLink>
      </p>
    </div>
  </form>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.875rem;
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
