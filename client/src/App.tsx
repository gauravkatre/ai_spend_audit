import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import AuditPage from './pages/AuditPage.js';
import ResultsPage from './pages/ResultsPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/results/:shareId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;