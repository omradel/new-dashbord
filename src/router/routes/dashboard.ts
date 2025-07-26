const dashboardRoutes = [
  {
    path: '',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard/Home.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/pages/Dashboard/Orders.vue'),
  },
]

export default dashboardRoutes
