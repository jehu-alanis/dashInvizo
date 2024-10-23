import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard'))
//const Dashboard = React.lazy(() => import('./'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Users = React.lazy(() => import('./views/users'))
const Requisisones = React.lazy(() => import('./views/requisicion'))
const Clientes = React.lazy(() => import('./views/clients'))
const Inventario = React.lazy(() => import('./views/inventario'))
const Ventas = React.lazy(() => import('./views/ventas'))



const routes = [
  { path: '/',name: 'Inicio', element: Dashboard },
  { path: '/dashboard', name: 'Inicio', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/users', name: 'users', element: Users },
  { path: '/requisisones', name: 'Requisisones', element: Requisisones },
  { path: '/clientes', name: 'Clientes', element: Clientes },
  { path: '/inventario', name: 'Inventario', element: Inventario },
  { path: '/ventas', name: 'Ventas', element: Ventas },


]

export default routes
