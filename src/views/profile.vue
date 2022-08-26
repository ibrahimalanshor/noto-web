<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import { LayoutApp } from '@/layouts';
import {
  BaseButton,
  BaseForm,
  BaseState,
  BaseSkeleton,
} from '@/components/base';
import { ProfileLogoutConfirm } from '@/components/profile';
import { HandledError } from '@/interfaces';

import { useToast } from '@/store';
import { useGetProfile, useUpdateProfile } from '@/compose/profile';

const toast = useToast();
const { loading: getProfileLoading, profile, getProfile } = useGetProfile();
const {
  loading: profileUpdateLoading,
  validation,
  body,
  setBody,
  updateProfile,
} = useUpdateProfile();

const profileLogoutConfirmVisible = ref(false);
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setProfile = async () => {
  try {
    await getProfile();

    setBody(profile.value);
  } catch (err) {
    errorState.visible = true;
    errorState.title = 'Something Error';
    errorState.text = 'Something error when displaying data';
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
        <base-state
          v-if="errorState.visible"
          :title="errorState.title"
          :text="errorState.text"
        />

        <form v-on:submit.prevent="handleSubmit" v-else>
          <base-form
            label="Name"
            placeholder="Name"
            :color="validation?.name ? 'danger' : ''"
            :helper="validation?.name?.msg"
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
            :color="validation?.password ? 'danger' : ''"
            :helper="validation?.password?.msg"
            v-model="body.password"
          />
          <base-form
            type="password"
            label="Password Confirmation"
            placeholder="Password Confirmation"
            :color="validation?.password_confirmation ? 'danger' : ''"
            :helper="validation?.password_confirmation?.msg"
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
