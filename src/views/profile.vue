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
import { setupTitle } from '@/helpers';

import { useI18n } from 'vue-i18n';
import { useToast } from '@/store';
import { useGetProfile, useUpdateProfile } from '@/compose/profile';

const { t } = useI18n();
const toast = useToast();
const { loading: profileGetLoading, profile, getProfile } = useGetProfile();
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
    errorState.title = t('error.client');
    errorState.text = t('error.fetch-data');
  }
};

const handleSubmit = async () => {
  try {
    const res = await updateProfile(profile.value.id, body);

    toast.show(res.message, 'success');
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show(t('error.client'));
    }
  }
};
const handleClickLogout = () => {
  profileLogoutConfirmVisible.value = true;
};

onMounted(() => {
  setProfile();
});

setupTitle(t('page.profile'));
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
          <h1 class="font-bold text-3xl text-gray-900">
            {{ t('profile.title') }}
          </h1>
        </div>
        <base-button
          color="danger"
          :label="t('profile.action.logout.title')"
          v-on:click="handleClickLogout"
        />
      </div>
    </div>
    <div class="p-5">
      <base-skeleton class="mb-4" v-if="profileGetLoading" />
      <template v-else>
        <base-state
          v-if="errorState.visible"
          :title="errorState.title"
          :text="errorState.text"
        />

        <form v-on:submit.prevent="handleSubmit" v-else>
          <base-form
            :label="t('form.label.name')"
            :placeholder="t('form.placeholder.name')"
            :color="validation?.name ? 'danger' : ''"
            :helper="validation?.name?.msg"
            v-model="body.name"
          />
          <base-form
            :label="t('form.label.email')"
            :placeholder="t('form.placeholder.email')"
            v-model="profile.email"
            disabled
          />
          <base-form
            :label="t('form.label.password')"
            :placeholder="t('form.placeholder.password')"
            :color="validation?.password ? 'danger' : ''"
            :helper="validation?.password?.msg"
            v-model="body.password"
          />
          <base-form
            type="password"
            :label="t('form.label.password-confirmation')"
            :placeholder="t('form.placeholder.password-confirmation')"
            :color="validation?.password_confirmation ? 'danger' : ''"
            :helper="validation?.password_confirmation?.msg"
            v-model="body.password_confirmation"
          />

          <base-button
            type="submit"
            :disabled="profileUpdateLoading"
            :loading="profileUpdateLoading"
            >{{ t('action.save') }}</base-button
          >
        </form>
      </template>
    </div>
    <profile-logout-confirm v-model="profileLogoutConfirmVisible" />
  </layout-app>
</template>
