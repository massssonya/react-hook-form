import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom'

import './index.css'
import { Layout } from './Layout.tsx'

import { Game, Home, ErrorPage } from './pages'
import { GameProvider } from './api/game-context.tsx'
import { AnimateTransitionPage } from './component/animate/animate-transition-page.tsx'

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <AnimateTransitionPage direction='right'><Home /></AnimateTransitionPage>,
    id: "Home",
  },
  {
    path: "/game",
    element: <AnimateTransitionPage direction='left'><Game /></AnimateTransitionPage>,
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
  </StrictMode>
)
