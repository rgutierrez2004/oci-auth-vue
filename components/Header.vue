<script setup lang="ts">
const { signIn } = useAuth()

const links = [{
    label: 'OAuth 2.0 & OIDC',
    icon: 'i-heroicons-credit-card',
    click: () => signIn('oci-iam')
  }, {
    label: 'OCI SDK Documentation',
    icon: 'i-heroicons-document-text',
    to: 'https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm',
    target: '_blank'
  }, {
    label: 'About Auth.js',
    icon: 'i-heroicons-rocket-launch',
    to: 'https://authjs.dev/',
    target: '_blank'
  }]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      OCI Auth <UBadge label="Home" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UColorModeButton size="sm" class="hidden lg:flex" />
      <AuthStatus />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />
      <UDivider class="my-6" />
      <UButton label="Sign in" color="white" block class="mb-3" />
      <UButton label="Get started" block />
    </template>
  </UHeader>
</template>
