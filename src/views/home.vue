<script setup>
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu class="mb-6" />
      <h1 class="font-bold text-3xl text-gray-900">All Notes</h1>
    </div>
    <div>
      <div class="border-b p-5 border-gray-200 hover:bg-gray-100">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>General</span>
          </div>
          <time>13/05/2003</time>
        </div>
        <h2 class="font-bold text-lg text-gray-900 mb-1">Shopping List</h2>
        <div class="text-gray-700 leading-loose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
          dolores earum, reprehenderit consectetur cupiditate numquam corporis
          ex, laboriosam ad labore aut consequatur minima quasi facere accusamus
          maxime, sapiente incidunt blanditiis.
        </div>
      </div>
      <div class="border-b p-5 border-gray-200 hover:bg-gray-100">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>General</span>
          </div>
          <time>13/05/2003</time>
        </div>
        <h2 class="font-bold text-lg text-gray-900 mb-1">Shopping List</h2>
        <div class="text-gray-700 leading-loose">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          laborum necessitatibus numquam ipsum suscipit atque earum rerum, odio
          vitae obcaecati. Esse hic cupiditate, necessitatibus tempora vitae
          quaerat voluptate aliquid. Eligendi.
        </div>
      </div>
      <div class="border-b p-5 border-gray-200 hover:bg-gray-100">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>General</span>
          </div>
          <time>13/05/2003</time>
        </div>
        <h2 class="font-bold text-lg text-gray-900 mb-1">Shopping List</h2>
        <div class="text-gray-700 leading-loose">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
          modi eveniet culpa deleniti commodi suscipit temporibus, quia esse
          fugiat harum. Exercitationem, nisi et eveniet delectus odio quidem
          fuga nam sapiente!
        </div>
      </div>
    </div>
  </layout-app>
</template>
