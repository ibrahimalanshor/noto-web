<script setup>
import { reactive, computed } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';
import { HandledError } from '@/interfaces';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useLogin } from '@/compose/auth';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const { validation, credential, loading, login } = useLogin();

const alert = reactive({
  visible: false,
  text: '',
});

const handleSubmit = async () => {
  alert.visible = false;

  try {
    await login();

    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('Something Error');
    } else if ([401].includes(err.errors.status)) {
      alert.visible = true;
      alert.text = err.errors.message;
    }
  }
};
</script>

<template>
  <layout-auth :title="t('message.hello', { name: 'sukri' })">
    <base-alert color="danger" :text="alert.text" v-model="alert.visible" />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        label="Email"
        type="email"
        placeholder="Email"
        :color="validation?.email ? 'danger' : ''"
        :helper="validation?.email?.msg"
        v-model="credential.email"
      />
      <base-form
        label="Password"
        type="password"
        placeholder="Password"
        :color="validation?.password ? 'danger' : ''"
        :helper="validation?.password?.msg"
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
