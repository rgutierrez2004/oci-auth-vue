<template>
  <UFooter>
    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UButton to="https://nuxt.com/" target="_blank" icon="i-simple-icons-github" aria-label="Nuxt" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
