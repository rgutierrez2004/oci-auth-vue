<script setup lang="ts">
  definePageMeta({ auth: false })
  const { data: session, status, getCsrfToken, getProviders } = useAuth()
  const providers = await getProviders()
  const csrfToken = await getCsrfToken()
</script>

<template>
  <UContainer>
    <UCard class="mt-4">
      <template #header>
        <div class="w-full flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold">
              Authentication Overview
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              See all available authentication & session information below.
            </p>
          </div>
          <NuxtLink v-if="session" to="/protected">
            <UButton color="primary">
              View Protected Page
            </UButton>
          </NuxtLink>
        </div>
      </template>

      <div class="space-y-4">
        <UCard v-if="status" class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">Status:</span>
            {{ status }}
          </div>
        </UCard>

        <UCard v-if="session" class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">Data:</span>
            <pre class="overflow-x-auto">{{ JSON.stringify(session, null, 2) }}</pre>
          </div>
        </UCard>

        <UCard v-if="csrfToken" class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">CSRF Token:</span>
            {{ csrfToken }}
          </div>
        </UCard>

        <UCard v-if="providers" class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">Providers:</span>
            <pre class="overflow-x-auto">{{ JSON.stringify(providers, null, 2) }}</pre>
          </div>
        </UCard>
      </div>
    </UCard>
  </UContainer>
</template>
