import { Outlet } from 'react-router-dom';
import Layout from './components/ui/Layout';

export function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
