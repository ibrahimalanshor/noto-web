<script setup>
import { computed } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';
import { HandledError } from '@/interfaces';

import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useLogin } from '@/compose/auth';

const router = useRouter();
const toast = useToast();
const { error, credential, loading, login } = useLogin();

const loginLoadingErrorState = computed(() => error.value?.status === 401);

const handleSubmit = async () => {
  try {
    await login();

    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('Something Error');
    }
  }
};
</script>

<template>
  <layout-auth title="Sign in to your account">
    <base-alert
      color="danger"
      :visible="loginLoadingErrorState"
      :text="error?.message"
    />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        label="Email"
        type="email"
        placeholder="Email"
        :color="error?.errors?.email ? 'danger' : ''"
        :helper="error?.errors?.email?.msg"
        v-model="credential.email"
      />
      <base-form
        label="Password"
        type="password"
        placeholder="Password"
        :color="error?.errors?.password ? 'danger' : ''"
        :helper="error?.errors?.password?.msg"
        v-model="credential.password"
      />
      <base-button
        type="submit"
        label="Sign In"
        class="mb-4"
        block
        :disabled="loading"
        :loading="loading"
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
