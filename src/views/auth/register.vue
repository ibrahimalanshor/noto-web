<script setup>
import { computed } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';

import { HandledError } from '@/interfaces';

import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useRegister } from '@/compose/auth';

const router = useRouter();
const toast = useToast();
const { error, credential, loading, register, resetError } = useRegister();

const hasError = computed(() => error.value?.status === 401);

const handleCloseAlert = () => resetError();
const handleSubmit = async () => {
  try {
    await register();

    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('Something Error');
    }
  }
};
</script>

<template>
  <layout-auth title="Create your Free Account">
    <base-alert color="danger" :text="error?.message" :visible="hasError" />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        label="Name"
        placeholder="Name"
        :color="error?.errors?.name ? 'danger' : ''"
        :helper="error?.errors?.name?.msg"
        v-model="credential.name"
      />
      <base-form
        label="Email"
        placeholder="Email"
        type="email"
        :color="error?.errors?.email ? 'danger' : ''"
        :helper="error?.errors?.email?.msg"
        v-model="credential.email"
      />
      <base-form
        label="Password"
        placeholder="Password"
        type="Password"
        :color="error?.errors?.password ? 'danger' : ''"
        :helper="error?.errors?.password?.msg"
        v-model="credential.password"
      />
      <base-form
        label="Password Confirmation"
        placeholder="Password Confirmation"
        type="password"
        :color="error?.errors?.password_confirmation ? 'danger' : ''"
        :helper="error?.errors?.password_confirmation?.msg"
        v-model="credential.password_confirmation"
      />
      <base-button
        type="submit"
        label="Sign Up"
        class="mb-4"
        block
        :disabled="loading"
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
