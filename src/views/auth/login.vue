<script setup>
import { computed } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';
import { HandledError } from '@/interfaces';

import { useRouter } from 'vue-router';
import { useLogin } from '@/compose/auth';

const router = useRouter();
const { error, credential, loading, login, resetError } = useLogin();

const hasError = computed(() => error.value?.status === 401);

const handleCloseAlert = () => resetError();
const handleSubmit = async () => {
  try {
    await login();

    router.push({ name: 'login' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      alert('something error');
    }
  }
};
</script>

<template>
  <layout-auth title="Sign in to your account">
    <base-alert
      color="danger"
      :visible="hasError"
      :text="error?.message"
      v-on:close="handleCloseAlert"
    />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        label="Email"
        v-model="credential.email"
        :color="error?.errors?.email ? 'danger' : ''"
        :helper="error?.errors?.email?.msg"
      />
      <base-form
        label="Password"
        v-model="credential.password"
        :color="error?.errors?.password ? 'danger' : ''"
        :helper="error?.errors?.password?.msg"
      />
      <base-button
        type="submit"
        label="Sign In"
        class="mb-4"
        block
        :disabled="loading"
      />
      <p
        class="text-center text-sm font-light text-gray-500 dark:text-gray-400"
      >
        Don’t have an account yet?
        <router-link
          :to="{ name: 'Register' }"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >Sign up here</router-link
        >
      </p>
    </form>
  </layout-auth>
</template>
