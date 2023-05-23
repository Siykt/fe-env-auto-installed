import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import InstallApp from './InstallApp';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InstallApp />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
