<script setup>
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton } from '@/components/base';
</script>

<template>
  <layout-auth title="Create your Free Account">
    <form action="#">
      <base-form label="Name" />
      <base-form label="Email" />
      <base-form label="Password" />
      <base-form label="Password Confirmation" />
      <base-button label="Sign In" class="mb-4" block />
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
