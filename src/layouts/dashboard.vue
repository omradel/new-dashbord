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
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// intital configuration for lang and dir
onMounted(() => {
  const savedLang = localStorage.getItem('lang') || 'en'
  locale.value = savedLang
  document.documentElement.lang = savedLang
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
})
</script>
