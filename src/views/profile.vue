<script setup>
import { ref, onMounted, computed } from 'vue';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import { LayoutApp } from '@/layouts';
import {
  BaseButton,
  BaseForm,
  BaseError,
  BaseSkeleton,
  BaseAlert,
} from '@/components/base';
import { ProfileLogoutConfirm } from '@/components/profile';
import { HandledError } from '@/interfaces';

import { useToast } from '@/store';
import { useGetProfile, useUpdateProfile } from '@/compose/profile';

const toast = useToast();
const { loading: getProfileLoading, profile, getProfile } = useGetProfile();
const {
  loading: profileUpdateLoading,
  error: profileUpdateError,
  body,
  setBody,
  updateProfile,
} = useUpdateProfile();

const profileLogoutConfirmVisible = ref(false);

const profileGetErrorState = ref(false);
const profileUpdateErrorState = computed(
  () => profileUpdateError.value?.status === 401
);

const setProfile = async () => {
  try {
    await getProfile();

    setBody(profile.value);
  } catch (err) {
    profileGetErrorState.value = true;
  }
};

const handleSubmit = async () => {
  try {
    const res = await updateProfile(profile.value.id, body);

    toast.show(res.message, 'success');
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('Something Error');
    }
  }
};
const handleClickLogout = () => {
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
          v-on:click="handleClickLogout"
        />
      </div>
    </div>
    <div class="p-5">
      <base-skeleton class="mb-4" v-if="getProfileLoading" />
      <template v-else>
        <base-error
          v-if="profileGetErrorState"
          title="Something Error"
          text="Something error when displaying data"
        />

        <form v-on:submit.prevent="handleSubmit" v-else>
          <base-alert
            class="mb-4"
            color="danger"
            :visible="profileUpdateErrorState"
            :text="profileUpdateError?.message"
          />
          <base-form
            label="Name"
            placeholder="Name"
            :color="profileUpdateError?.errors?.name ? 'danger' : ''"
            :helper="profileUpdateError?.errors?.name?.msg"
            v-model="body.name"
          />
          <base-form
            type="email"
            label="Email"
            placeholder="Email"
            v-model="profile.email"
            disabled
          />
          <base-form
            type="password"
            label="Password"
            placeholder="Password"
            :color="profileUpdateError?.errors?.password ? 'danger' : ''"
            :helper="profileUpdateError?.errors?.password?.msg"
            v-model="body.password"
          />
          <base-form
            type="password"
            label="Password Confirmation"
            placeholder="Password Confirmation"
            :color="
              profileUpdateError?.errors?.password_confirmation ? 'danger' : ''
            "
            :helper="profileUpdateError?.errors?.password_confirmation?.msg"
            v-model="body.password_confirmation"
          />

          <base-button
            type="submit"
            :disabled="profileUpdateLoading"
            :loading="profileUpdateLoading"
            >Save</base-button
          >
        </form>
      </template>
    </div>
    <profile-logout-confirm v-model="profileLogoutConfirmVisible" />
  </layout-app>
</template>
