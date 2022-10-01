import { render } from 'preact';
import { Provider } from 'react-redux';
import { store } from './store/store';

import '@fontsource/rubik/500.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/300.css';
import './style/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';

render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('app') as HTMLElement
);
