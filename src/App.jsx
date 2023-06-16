import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import Calendar from './components/Calendar'
import { client } from './api-client'
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import ErrorPage from './components/pages/error-page'
import LoginPage from './components/pages/login-page'
import RegistrationPage from './components/pages/registration-page'
import { LoginContext } from './context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function TopBarWrapper() {
  return (
    <>
      <TopBar/>
      <Outlet/>  {/*children*/}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopBarWrapper/>,
    errorElement: <>
      <TopBar/>
      <ErrorPage/>
    </>,
    children: [
      {
        path: "",
        element: <Calendar/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "registrazione",
        element: <RegistrationPage/>,
        errorElement: <ErrorPage/>
      },
    ]
  }
]);


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(client.isLoggedIn())

  const queryClient = new QueryClient()

  return (
    <div>
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LoginContext.Provider>
    </div>
  )
}

export default App
