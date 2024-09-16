import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//const Dashboard = React.lazy(() => import('./'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Users = React.lazy(() => import('./views/users'))
const Requisisones = React.lazy(() => import('./views/requisicion'))


const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/users', name: 'users', element: Users },
  { path: '/requisisones', name: 'Requisisones', element: Requisisones },

]

export default routes
