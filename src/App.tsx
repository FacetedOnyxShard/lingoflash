import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudyPage from "./pages/StudyPage";
import AddWordPage from "./pages/AddWordPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudyPage />} />
          <Route path="add" element={<AddWordPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
