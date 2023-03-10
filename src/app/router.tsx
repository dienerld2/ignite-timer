import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './Layouts/DefaultLayout';
import { History } from './Pages/History';
import { Home } from './Pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
