import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom'

import './index.css'
import { Layout } from './Layout.tsx'
import { ErrorPage } from './error-page.tsx'

import { Game, Home } from './pages'
import { GameProvider } from './api/game-context.tsx'

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    id: "Home"
  },
  {
    path: "/game",
    element: <Game />,
    id: "Game"
  }
]

const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    id: "root",
    children: routers,
    errorElement: <ErrorPage />
  }
]

const router = createBrowserRouter(rootRouter)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </StrictMode>,
)
