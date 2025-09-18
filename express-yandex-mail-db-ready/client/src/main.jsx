import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'

// --------------------
//    PUBLIC PAGES
// --------------------
import Home from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AuthCallback from './pages/AuthCallback.jsx';
// --------------------
//    PRIVATE PAGES
// --------------------
import AdminPage from './pages/private/AdminPage.jsx'
import ClientAdminPage from './pages/private/ClientAdminPage.jsx'

import { AuthProvider } from './providers/AuthProvider.jsx';
import ErrorPage from './pages/ErrorPage.jsx'

// Создаем роутер с включенным флагом будущего v7
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, // Обработка ошибок маршрутизации
    children: [
      // ---------------
      //  public pages 
      // ---------------      
      { index: true, element: <Home /> },         // Главная страница
      { path: 'login', element: <LoginPage /> }, // /вход
      { path: 'auth-callback', element: <AuthCallback /> }, //             

      // ---------------
      //  private pages 
      // ---------------     
      { path: 'cp/client-admin', element: <ClientAdminPage /> }, // /кабинет пользователя (клиента)
      { path: 'cp/admin', element: <AdminPage /> }, // /кабинет администратора
      
      // Ленивая загрузка (опционально)
      // { 
      //   path: 'dashboard', 
      //   lazy: () => import('./pages/Dashboard') 
      // }
    ]
  }
], {
  future: {
    v7_startTransition: true, // Включаем флаг для v7
    // v7_fetcherPersist: true, // Дополнительный флаг для персистентности
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
