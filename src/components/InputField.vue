<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  disabled: Boolean,
  errors: { type: Array },
})

const model = defineModel()
</script>

<template>
  <div class="field">
    <div class="form">
      <input
        :name="name"
        class="form__input"
        :type="type"
        placeholder=" "
        v-model="model"
        :disabled="disabled"
      />
      <label class="form__label" v-text="label"></label>
    </div>
    <small v-for="error in errors" v-text="error"></small>
  </div>
</template>

<style scoped>
.field {
  margin: 28px 0;
}

small {
  font-size: 12px;
  color: #fb2c36;
}

.form {
  position: relative;
  border-bottom: 2px solid #2c3e50;
}

.form__input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 36px 0 6px;
  color: inherit;
}

.form__label {
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

.form__input:focus ~ .form__label,
.form__input:not(:placeholder-shown).form__input:not(:focus) ~ .form__label {
  top: -8px;
  font-size: 0.875rem;
}
</style>
