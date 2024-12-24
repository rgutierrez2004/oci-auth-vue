<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <UMain class="flex-1">
      <div class="container mx-auto px-4">
        <slot />
      </div>
    </UMain>
    <Footer />
  </div>
</template>
