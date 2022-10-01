import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import Commands from './pages/Commands';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'commands',
        element: <Commands />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
