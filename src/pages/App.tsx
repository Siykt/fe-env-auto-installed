import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import InstallApp from './InstallApp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<InstallApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
