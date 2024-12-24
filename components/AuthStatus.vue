<script setup lang="ts">
const { data, status, signIn, signOut } = useAuth()
</script>

<template>
  <div v-if="status === 'authenticated'" class="flex items-center gap-4">
    <span class="text-sm font-medium text-green-700">{{ data?.user?.name }}</span>
    <UButton
      label="Logout"
      color="black"
      variant="solid"
      class="hidden lg:flex"
      @click="signOut({ callbackUrl: `logout=${data?.idToken}` })"
    />
  </div>
</template>

<style scoped>
.break-all {
  word-break: break-all;
  white-space: normal;
  max-width: 100%;
  overflow-wrap: break-word;
}
</style>