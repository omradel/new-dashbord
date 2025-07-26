<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

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
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

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
