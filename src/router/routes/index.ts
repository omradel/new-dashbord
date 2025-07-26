import dashboard from '@/layouts/dashboard.vue'
import dashboardRoutes from './dashboard'

export default [
  {
    path: '/',
    name: 'dashboardLayout',
    component: dashboard,
    children: [...dashboardRoutes],
  },
]
