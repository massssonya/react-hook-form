import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import { Layout } from './Layout.tsx'
import { ErrorPage } from './ErrorPage.tsx'
import { Game } from './pages/game.tsx'
import { GameProvider } from './api/GameContext.tsx'

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <App />,
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
