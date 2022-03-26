import Layout from '@/layout'
export default {
  path: '/import-router',
  component: Layout,
  hidden: true, // 不在菜单中显示
  children: [{
    path: '',
    component: () => import('@/views/import-router')
  }]
}
