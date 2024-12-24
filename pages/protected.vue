<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { data: session } = useAuth()
</script>

<template>
  <UContainer>
    <UCard class="mt-4">
      <template #header>
        <div class="w-full flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold">
              Protected Page
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              This page is only accessible to authenticated users.
            </p>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <UCard class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">User Info:</span>
            <pre class="overflow-x-auto">{{ JSON.stringify({id: session?.user?.id,name: session?.user?.name,email: session?.user?.email,}, null, 2) }}</pre>
          </div>
        </UCard>

        <UCard class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">Access Token:</span>
            <pre class="overflow-x-auto">{{ session?.accessToken }}</pre>
          </div>
        </UCard>

        <UCard class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">ID Token:</span>
            <pre class="overflow-x-auto">{{ session?.idToken }}</pre>
          </div>
        </UCard>

        <UCard class="bg-gray-50 dark:bg-gray-800">
          <div class="font-mono">
            <span class="text-green-600 dark:text-green-400">Full Session:</span>
            <pre class="overflow-x-auto">{{ JSON.stringify(session, null, 2) }}</pre>
          </div>
        </UCard>
      </div>
    </UCard>
  </UContainer>
</template>
