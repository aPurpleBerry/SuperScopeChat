import {createRouter, createWebHashHistory} from 'vue-router'

let router = createRouter({
  //模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/404',
      component: ()=>import('@/views/404/index.vue'),
      name: '404', //命名路由
      meta: {
        title: '404',
        hidden: true,
        icon: 'SetUp'
      },
    },
    {
      path: '/',
      component: ()=>import('@/layout/index.vue'),
      name: 'layout', //命名路由
      meta: {
        title: 'layout',
      },
      redirect: '/portfolio',
      children: [
        {
          path: '/portfolio',
          component: ()=>import('@/views/portfolio/index.vue'),
          name:'portfolio',
          meta: {
            title: 'portfolio'
          }
        }
      ]
    },
    {
      path: '/apitest',
      component: ()=>import('@/layout/index.vue'),
      name: 'apitest', //命名路由
      redirect: '/apitest',
      children: [
        {
          path: '/apitest',
          component: ()=>import('@/views/apiTest/index.vue'),
          name:'apitest',
          meta: {
            title: 'apitest'
          }
        }
      ]
    },
    {
      path: '/newchat',
      component: ()=>import('@/layout/index.vue'),
      name: 'newchat', //命名路由
      redirect: '/newchat',
      children: [
        {
          path: '/newchat',
          component: ()=>import('@/views/newChat/index.vue'),
          name:'newchat',
          meta: {
            title: 'newchat'
          }
        }
      ]
    }
  ]
})

export default router;