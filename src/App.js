import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { setAuthenticated } from '../src/actions/autenticated';
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
         
          {!isAuthenticated ? (
            <>
              <Route path="/" name="Login Page" element={<Login />} />
              <Route path="*" element={<Login/>} />
            </>
            
          ) : (
            <>
              {/* Ruta a Home cuando está autenticado */}
              <Route path="/" element={<DefaultLayout/>} />
              <Route path="/home" element={<DefaultLayout />} />
              <Route path="*" element={<DefaultLayout/>} />
            </>
          )}
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
