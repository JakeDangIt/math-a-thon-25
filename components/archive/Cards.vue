<template>
  <!-- show Skeleton Loader while loading -->
  <div
    class="mx-2 flex flex-col flex-wrap justify-center gap-4 lg:flex-row"
    v-if="archiveStore.isLoading"
  >
    <Skeleton class="h-60 lg:w-1/3" />
    <Skeleton class="h-60 lg:w-1/3" />
  </div>

  <!-- once loading is complete, show the archive cards -->
  <div
    v-else
    class="mx-2 flex flex-col flex-wrap justify-center gap-4 lg:flex-row"
  >
    <!-- card for each year -->
    <ArchiveCard :filesYear="archiveStore.files2024" year="2024" />
    <ArchiveCard :filesYear="archiveStore.files2023" year="2023" />
  </div>
</template>

<script setup>
const archiveStore = useArchiveStore();
</script>
