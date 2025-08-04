<script setup lang="ts">
import AppSidebar from '@/components/layout/dashboard/AppSidebar.vue'
import NavBar from '@/components/layout/dashboard/NavBar.vue'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
</script>

<template>
  <div class="dashboard-layout">
    <SidebarProvider :defaultOpen="false">
      <AppSidebar />
      <SidebarInset>
        <NavBar />

        <RouterView class="p-4" />

        <!-- <router-view v-slot="{ Component, route }" class="p-4">
          <transition :name="'fade'" mode="out-in">
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </transition>
        </router-view> -->
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
