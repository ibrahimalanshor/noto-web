<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import { LayoutApp } from '@/layouts';
import {
  BaseButton,
  BaseForm,
  BaseError,
  BaseSkeleton,
} from '@/components/base';
import { ProfileLogoutConfirm } from '@/components/profile';

import { useGetProfile } from '@/compose/profile';

const { loading, profile, getProfile } = useGetProfile();

const profileLogoutConfirmVisible = ref(false);
const error = ref(false);

const setProfile = async () => {
  try {
    await getProfile();
  } catch (err) {
    error.value = true;
  }
};

const handleDeleteAll = () => {
  profileLogoutConfirmVisible.value = true;
};

onMounted(() => {
  setProfile();
});
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link
            :to="{ name: 'Home', params: { id: 1 } }"
            v-slot="{ navigate }"
          >
            <button class="flex items-center" v-on:click="navigate">
              <icon size="20">
                <back-icon />
              </icon>
            </button>
          </router-link>
          <h1 class="font-bold text-3xl text-gray-900">Profile</h1>
        </div>
        <base-button
          color="danger"
          label="Logout"
          v-on:click="handleDeleteAll"
        />
      </div>
    </div>
    <div class="p-5">
      <base-skeleton class="mb-4" v-if="loading" />
      <template v-else>
        <base-error
          v-if="error"
          title="Something Error"
          text="Something error when displaying data"
        />

        <form v-else>
          <base-form label="Name" placeholder="Name" />
          <base-form type="email" label="Email" placeholder="Email" disabled />
          <base-form type="password" label="Password" placeholder="Password" />
          <base-form
            type="password"
            label="Password Confirmation"
            placeholder="Password Confirmation"
          />

          <base-button>Save</base-button>
        </form>
      </template>
    </div>
    <profile-logout-confirm v-model="profileLogoutConfirmVisible" />
  </layout-app>
</template>
