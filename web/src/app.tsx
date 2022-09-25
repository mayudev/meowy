import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/context/ThemeContext';
import Layout from './components/ui/Layout';

export function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}
