<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { LayoutApp } from '@/layouts';
import { BaseForm, BaseTextarea, BaseButton, BaseDot } from '@/components/base';
import { NoteDeleteConfirm } from '@/components/note';
import { Icon } from '@vicons/utils';
import {
  Star as FavoriteIcon,
  Edit as EditIcon,
  TrashCan as TrashIcon,
  ArrowLeft as BackIcon,
} from '@vicons/carbon';

const noteDeleteConfirmVisible = ref(false);

const handleDelete = () => {
  noteDeleteConfirmVisible.value = true;
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center justify-between">
      <div class="text-gray-600 flex">
        <router-link :to="{ name: 'Home' }" v-slot="{ navigate }">
          <button class="flex items-center" v-on:click="navigate">
            <icon size="20">
              <back-icon />
            </icon>
          </button>
        </router-link>
      </div>
      <div class="flex space-x-2">
        <base-button class="flex items-center" color="warning">
          <icon size="16">
            <favorite-icon />
          </icon>
        </base-button>
        <router-link
          :to="{ name: 'NoteEdit', params: { id: 1 } }"
          v-slot="{ navigate }"
        >
          <base-button
            class="flex items-center h-full"
            color="primary"
            v-on:click="navigate"
          >
            <icon size="16">
              <edit-icon />
            </icon>
          </base-button>
        </router-link>
        <base-button
          class="flex items-center"
          color="danger"
          v-on:click="handleDelete"
        >
          <icon size="16">
            <trash-icon />
          </icon>
        </base-button>
      </div>
    </div>
    <div class="px-5 py-6 leading-loose text-gray-900">
      <div class="flex items-center justify-between text-gray-600">
        <div class="flex items-center space-x-2 mb-4">
          <base-dot color="primary" />
          <span>General</span>
        </div>
        <span>13/05/2003</span>
      </div>
      <h1 class="font-bold text-3xl text-gray-900 mb-5">
        Minder: Aplikasi Mindmap untuk GNU/Linux
      </h1>
      <p class="mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel dolor
        placerat, dictum justo at, accumsan risus. Maecenas vel mauris id sapien
        aliquam cursus. Morbi quis pretium arcu. Proin vehicula iaculis auctor.
        Nunc est felis, imperdiet et interdum eget, sodales quis sapien. Nam
        tristique eleifend dui, non vehicula sem facilisis id. Vivamus tincidunt
        sagittis velit, at consectetur lectus pulvinar quis. Sed id dapibus sem.
      </p>
      <p class="mb-5">
        Proin fringilla magna quam, ut elementum velit suscipit ac. Cras feugiat
        dui quis lectus mollis, et dictum purus venenatis. Ut finibus libero in
        justo eleifend lobortis. In vel massa tellus. Donec a diam vestibulum,
        lobortis dolor non, hendrerit leo. Integer commodo, nunc id vestibulum
        placerat, enim tellus consectetur diam, suscipit tristique dolor purus
        sed risus. Donec vitae est vitae dolor tincidunt efficitur. Aliquam
        mauris sem, aliquet accumsan odio et, varius ullamcorper turpis. Quisque
        dictum vel quam eu faucibus. Nam nisi risus, tincidunt in nisi nec,
        scelerisque fermentum magna. Aenean rhoncus mi vitae mi consequat, non
        consectetur tellus interdum. Quisque interdum ligula dictum maximus
        mollis. Praesent vitae tortor dolor. Aenean enim enim, euismod at
        efficitur eget, tempor consectetur elit.
      </p>
      <p class="mb-5">
        Maecenas vitae quam commodo, tristique metus id, scelerisque sem. In
        efficitur sit amet dolor a egestas. Pellentesque dictum libero vel orci
        vulputate tempus. Nullam in tincidunt ipsum, ac finibus velit. Ut
        tristique varius risus vulputate tincidunt. In vitae bibendum nibh, et
        lobortis neque. Vestibulum imperdiet nisi vel magna placerat, id varius
        risus vulputate. Fusce convallis ante arcu, tristique commodo nulla
        ultrices sed. Proin non viverra turpis. Aliquam lacinia, lectus et
        rutrum fringilla, elit libero ultricies nisi, eu vestibulum ipsum felis
        vitae purus. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Sed sed tristique sapien. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Nulla vel auctor
        tortor. Pellentesque et fermentum sapien.
      </p>
      <p class="mb-5">
        Nunc commodo lacus a elit maximus, id mollis nisi ornare. Curabitur
        semper lorem lorem, vitae eleifend dolor congue sit amet. Cras eleifend
        blandit sapien, in porta dui feugiat ac. Cras porttitor ex et efficitur
        molestie. Ut est risus, sagittis sit amet erat at, faucibus pulvinar
        magna. Sed eget efficitur dolor. Quisque ac nulla semper, tempor mi id,
        semper sapien. Praesent eget facilisis erat. Etiam at metus vel neque
        lacinia dictum. Curabitur at dignissim odio.
      </p>
      <p class="mb-5">
        Praesent eget hendrerit purus. Pellentesque volutpat convallis aliquam.
        Quisque et dolor est. Morbi efficitur risus tellus, volutpat dapibus
        neque pharetra aliquet. Integer mauris nunc, lacinia quis rhoncus at,
        bibendum in nulla. Nullam posuere dui eget fermentum tincidunt. Duis eu
        ligula posuere, luctus leo eget, lacinia leo. Proin malesuada lacus
        nisl, id euismod purus viverra a. Cras tempus viverra turpis congue
        lacinia. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Suspendisse erat ligula, blandit nec
        lacus sit amet, maximus euismod sapien. Aenean consectetur interdum
        sapien, in pharetra diam consequat ac. Vestibulum sed sapien auctor,
        finibus nunc non, facilisis ante. Vestibulum feugiat in risus at
        tristique. Curabitur dapibus id justo non varius.
      </p>
    </div>
    <note-delete-confirm v-model="noteDeleteConfirmVisible" />
  </layout-app>
</template>
