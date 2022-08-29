<script setup>
import { computed, reactive } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';

import { HandledError } from '@/interfaces';

import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useRegister } from '@/compose/auth';

const router = useRouter();
const toast = useToast();
const { validation, credential, loading, register } = useRegister();

const alert = reactive({
  visible: false,
  text: '',
});

const handleSubmit = async () => {
  alert.visible = false;

  try {
    await register();

    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('Something Error');
    } else if (err.errors.status === 409) {
      alert.visible = true;
      alert.text = err.errors.message;
    }
  }
};
</script>

<template>
  <layout-auth title="Create your Free Account">
    <base-alert color="danger" :text="alert.text" v-model="alert.visible" />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        label="Name"
        placeholder="Name"
        :color="validation?.name ? 'danger' : ''"
        :helper="validation?.name?.msg"
        v-model="credential.name"
      />
      <base-form
        label="Email"
        placeholder="Email"
        type="email"
        :color="validation?.email ? 'danger' : ''"
        :helper="validation?.email?.msg"
        v-model="credential.email"
      />
      <base-form
        label="Password"
        placeholder="Password"
        type="Password"
        :color="validation?.password ? 'danger' : ''"
        :helper="validation?.password?.msg"
        v-model="credential.password"
      />
      <base-form
        label="Password Confirmation"
        placeholder="Password Confirmation"
        type="password"
        :color="validation?.password_confirmation ? 'danger' : ''"
        :helper="validation?.password_confirmation?.msg"
        v-model="credential.password_confirmation"
      />
      <base-button
        type="submit"
        label="Sign Up"
        class="mb-4"
        block
        :disabled="loading"
        :loading="loading"
      />
      <p
        class="text-center text-sm font-light text-gray-500 dark:text-gray-400"
      >
        Already have an account?
        <router-link
          :to="{ name: 'Login' }"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >Sign in here</router-link
        >
      </p>
    </form>
  </layout-auth>
</template>
