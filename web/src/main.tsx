import { render } from 'preact';
import { Provider } from 'react-redux';
import { store } from './store/store';

import '@fontsource/rubik/variable.css';
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';

render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('app') as HTMLElement
);
