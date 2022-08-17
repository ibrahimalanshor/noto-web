<script setup>
import { ref } from 'vue';
import { LayoutApp } from '@/layouts';
import { BaseButton, BaseForm } from '@/components/base';
import { ProfileLogoutConfirm } from '@/components/profile';

const profileLogoutConfirmVisible = ref(false);

const handleDeleteAll = () => {
  profileLogoutConfirmVisible.value = true;
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-3xl text-gray-900">Profile</h1>
        <base-button
          color="danger"
          label="Logout"
          v-on:click="handleDeleteAll"
        />
      </div>
    </div>
    <div class="p-5">
      <base-form label="Name" placeholder="Name" />
      <base-form type="email" label="Email" placeholder="Email" disabled />
      <base-form type="password" label="Password" placeholder="Password" />
      <base-form
        type="password"
        label="Password Confirmation"
        placeholder="Password Confirmation"
      />

      <base-button>Save</base-button>
    </div>
    <profile-logout-confirm v-model="profileLogoutConfirmVisible" />
  </layout-app>
</template>
