<template>
  <div class="dashboard-layout">
    <SidebarProvider :defaultOpen="false">
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <RouterView class="p-4" />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/dashboard/AppSidebar.vue'
import NavBar from '@/components/layout/dashboard/NavBar.vue'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
</script>
