import dashboardRoutes from './dashboard'

export default [
  {
    path: '/',
    name: 'dashboardLayout',
    component: () => import('@/layouts/dashboard.vue'),
    children: [...dashboardRoutes],
  },
]
