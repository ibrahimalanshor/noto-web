<script setup>
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton } from '@/components/base';
</script>

<template>
  <layout-auth title="Sign in to your account">
    <form action="#">
      <base-form label="Email" />
      <base-form label="Password" />
      <base-button label="Sign In" class="mb-4" block />
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
