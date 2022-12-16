export const sidebarItems = [
  {
    icon: 'mdi-apps',
    title: '欢迎',
    to: '/'
  },
  {
    icon: 'mdi-lock',
    title: '菜单1',
    to: '/profile'
  },
  {
    icon: 'mdi-chart-bubble',
    title: '多级菜单',
    items: [
      {
        icon: 'mdi-apps',
        title: '子菜单1',
        to: '/login'
      },
      {
        icon: 'mdi-apps',
        title: '子菜单2',
        to: '/profile'
      }
    ]
  },
  {
    icon: 'mdi-account',
    title: '菜单2',
    to: '/profile'
  }
]

// 根据用户权限和路由生成菜单
export const filterSidebar = (sidebar, userRoles, routes) => {
  let i = sidebar.length
  while (i--) {
    let item = sidebar[i]
    if (item.items) { // 有子菜单
      filterSidebar(item.items, userRoles, routes)
      if (item.items.length == 0) {
        // 如果子菜单全没了，上级菜单也删掉
        sidebar.splice(i, 1)
      }
    } else { // 无子菜单，即菜单项
      let route = (routes.filter(r => r.path == item.to))[0] // 找到和左侧菜单路径匹配的路由
      if (!route) { // 找不到这个路由，删掉路径
        sidebar.splice(i, 1)
      } else {
        let routeRoles = route.meta?.roles || [] // 路由对应的角色
        if (routeRoles && routeRoles.length && userRoles.filter(userRole => routeRoles.includes(userRole)).length == 0) {
          // 用户角色和路由角色没有重叠的，说明没有权限，删掉路径
          sidebar.splice(i, 1)
        }
      }
      
    }
  }
}
