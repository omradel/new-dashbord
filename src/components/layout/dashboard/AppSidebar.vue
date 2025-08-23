<template>
  <Sidebar v-bind="props" :side="locale === 'ar' ? 'right' : 'left'">
    <SidebarHeader>
      <SidebarTeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarNavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarNavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { useI18n } from 'vue-i18n'

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  House,
  ShoppingCart,
  UsersRound,
  ScanBarcode,
  Boxes,
  Component,
  Settings,
} from 'lucide-vue-next'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarNavMain,
  SidebarNavUser,
  SidebarTeamSwitcher,
} from '@/components/ui/sidebar'

const { locale } = useI18n()

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  user: {
    name: 'Omar',
    email: 'o@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],

  navMain: [
    {
      title: 'Dashbord',
      url: '/',
      icon: House,
      isActive: false,
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: ShoppingCart,
      items: [
        {
          title: 'Cancled Orders',
          url: '#',
        },
        {
          title: 'Confirmmed Orders',
          url: '#',
        },
      ],
    },
    {
      title: 'Products',
      url: '#',
      icon: ScanBarcode,
    },
    {
      title: 'Categories',
      url: '#',
      icon: Boxes,
    },
    {
      title: 'Subcategories',
      url: '#',
      icon: Component,
    },
    {
      title: 'Users',
      url: '#',
      icon: UsersRound,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ],
}
</script>
