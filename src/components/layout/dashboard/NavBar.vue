<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#"> {{ $route.name }} </BreadcrumbLink>
          </BreadcrumbItem>
          <!-- <BreadcrumbSeparator class="hidden md:block" /> -->
          <!-- <BreadcrumbItem v-if="$route?.meta">
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem> -->
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>

<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from 'reka-ui'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>
