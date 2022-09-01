<script setup>
import { computed, reactive } from 'vue';
import { LayoutAuth } from '@/layouts';
import { BaseForm, BaseButton, BaseAlert } from '@/components/base';

import { HandledError } from '@/interfaces';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from '@/store';
import { useRegister } from '@/compose/auth';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const { validation, credential, loading, register } = useRegister();

const alert = reactive({
  visible: false,
  text: '',
});

const handleSubmit = async () => {
  alert.visible = false;

  try {
    await register();

    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show(t('error.client'));
    } else if (err.errors.status === 401) {
      alert.visible = true;
      alert.text = err.errors.message;
    }
  }
};
</script>

<template>
  <layout-auth :title="t('auth.register.title')">
    <base-alert color="danger" :text="alert.text" v-model="alert.visible" />
    <form v-on:submit.prevent="handleSubmit">
      <base-form
        :label="t('form.label.name')"
        :placeholder="t('form.placeholder.name')"
        :color="validation?.name ? 'danger' : ''"
        :helper="validation?.name?.msg"
        v-model="credential.name"
      />
      <base-form
        :label="t('form.label.email')"
        :placeholder="t('form.placeholder.email')"
        type="email"
        :color="validation?.email ? 'danger' : ''"
        :helper="validation?.email?.msg"
        v-model="credential.email"
      />
      <base-form
        :label="t('form.label.password')"
        :placeholder="t('form.placeholder.password')"
        type="Password"
        :color="validation?.password ? 'danger' : ''"
        :helper="validation?.password?.msg"
        v-model="credential.password"
      />
      <base-form
        :label="t('form.label.password-confirmation')"
        :placeholder="t('form.placeholder.password-confirmation')"
        type="password"
        :color="validation?.password_confirmation ? 'danger' : ''"
        :helper="validation?.password_confirmation?.msg"
        v-model="credential.password_confirmation"
      />
      <base-button
        type="submit"
        :label="t('auth.register.action.submit')"
        class="mb-4"
        block
        :disabled="loading"
        :loading="loading"
      />
      <p
        class="text-center text-sm font-light text-gray-500 dark:text-gray-400"
      >
        {{ t('auth.register.text.already-have-account') }}
        <router-link
          :to="{ name: 'Login' }"
          class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >{{ t('auth.register.text.redirect-login') }}</router-link
        >
      </p>
    </form>
  </layout-auth>
</template>
