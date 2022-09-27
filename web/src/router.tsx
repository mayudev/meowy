import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import Commands from './pages/Commands';
import Home from './pages/Home';

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
    ],
  },
]);

export default router;
